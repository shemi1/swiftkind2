from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('public.urls')),
<<<<<<< Updated upstream
    path('blog/', TemplateView.as_view(template_name='blog/blog_index_page.html')),
    path('blog/detail/', TemplateView.as_view(template_name='blog/blog.html')),
=======
    path('', include('blog.urls')),
>>>>>>> Stashed changes
]