from django.shortcuts import render
from django.views.generic.base import View
from django.http import JsonResponse
from django.core import serializers
from .models import BlogPage
from django.forms.models import model_to_dict

class RecentBlogView(View):
    """ Recent blog on sidebar section
    """

    def get(self, *args, **kwargs):
        posts = BlogPage.objects.live()[:3]
        results = []
        for post in posts:
            data = {
                'title': post.title,
                'slug': post.slug,
                'owner': post.owner.username,
                'tags': [tag.name for tag in post.tags.all()]
            }
            results.append(data)
        return JsonResponse(list(results), safe=False)
