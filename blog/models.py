from django.db import models
from django.contrib.auth.models import User
from django.shortcuts import render
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import (
    FieldPanel,
    MultiFieldPanel,
    PageChooserPanel,
)
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.search import index
from wagtail.contrib.routable_page.models import RoutablePageMixin, route

from modelcluster.fields import ParentalKey
from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.models import TaggedItemBase, Tag
import readtime


class BlogPageTag(TaggedItemBase):
    """ Blog tags
    """

    content_object = ParentalKey('BlogPage', related_name='tagged_items')


class BlogPage(Page):
    """ Blog page models
    """
    main_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
    )
    body = RichTextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    search_fields = Page.search_fields + [
        index.SearchField('title'),
        index.SearchField('body')
    ]
    tags = ClusterTaggableManager(through=BlogPageTag, blank=True)

    content_panels = Page.content_panels + [
        ImageChooserPanel('main_image'),
        FieldPanel('body'),
        FieldPanel('tags')
    ]
    read_time = models.CharField(max_length=200, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.read_time = str(readtime.of_text(self.body))
        super(BlogPage, self).save(*args, **kwargs)


class BlogIndexPage(RoutablePageMixin, Page):
    """ Blog index models 
    """

    # Featured blog section
    featured_blog = models.ForeignKey(
        BlogPage,
        null=True,
        blank=True,
        related_name='+',
        on_delete="CASCADE",
        help_text="Featured blog item",
        verbose_name="Feature blog section",
    )
    introduction = models.TextField(
        help_text='Text to describe the page',
        blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('introduction'),
        MultiFieldPanel([
            PageChooserPanel('featured_blog'),
        ], heading="Featured blog section", classname="collapsible"),
    ]

    @route(r'^$', name='blog')
    def index_route(self, request, *args, **kwargs):
        return super(BlogIndexPage, self).index_route(request, *args, **kwargs)

    def get_context(self, request):
        context = super(BlogIndexPage, self).get_context(request)
        
        all_posts = self.get_posts().order_by('-last_published_at')        
        paginator = Paginator(all_posts, 10)

        # ?page=x
        page = request.GET.get("page")

        try:
            # If the page exists and the ?page=x is an int
            posts = paginator.page(page)
        except PageNotAnInteger:
            # If the ?page=x is not an int; show the first page
            posts = paginator.page(1)
        except EmptyPage:
            # If the ?page=x is out of range (too high most likely)
            # Then return the last page
            posts = paginator.page(paginator.num_pages)
        
        context['posts'] = posts

        return context

    @route('^tags/$', name='tag_archive')
    @route('^tags/([\w-]+)/$', name='tag_archive')
    def tag_archive(self, request, tag=None):
        try:
            tag = Tag.objects.get(slug=tag)
        except Tag.DoesNotExist:
            if tag:
                msg = 'There are no blog posts tagged with "{}"'.format(tag)
                messages.add_message(request, messages.INFO, msg)
            return redirect(self.url)

        posts = self.get_posts(tag=tag)
        context = {
            'tag': tag,
            'posts': posts,
            'page': True
        }
        return render(request, 'blog/blog_index_page.html', context)

    def serve_preview(self, request, mode_name):
        # Needed for previews to work
        return self.serve(request)

    # Returns the child BlogPage objects for this BlogPageIndex.
    # If a tag is used then it will filter the posts by tag.
    def get_posts(self, tag=None):
        posts = BlogPage.objects.live().descendant_of(self)
        if tag:
            posts = posts.filter(tags=tag)
        return posts

    # Returns the list of Tags for all child posts of this BlogPage.
    def get_child_tags(self):
        tags = []
        for post in self.get_posts():
            # Not tags.append() because we don't want a list of lists
            tags += post.get_tags
        tags = sorted(set(tags))
        return tags
