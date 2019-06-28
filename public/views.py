from django.shortcuts import render
from django.http import JsonResponse
from .models import BlogPage


class RecentBlogView(View):
    """ Recent blog on sidebar section
    """

    def get(self, *args, **kwargs):
        posts = BlogPage.objects.live().order_by(
            '-last_published_at')[:3]
        posts = post.values_list('title', 'owner__name', 'tags__name')
        return JsonResponse(posts)
