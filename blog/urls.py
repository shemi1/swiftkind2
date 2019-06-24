from django.urls import path, re_path, include

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.core import urls as wagtail_urls

urlpatterns = [
    re_path(r'cms/', include(wagtailadmin_urls)),
    re_path(r'blog/', include(wagtail_urls))
]