from django.urls import path
from django.views.generic.base import TemplateView

urlpatterns = [
    path('index/', TemplateView.as_view(template_name='public/index.html'), name="index"),
    path('process/', TemplateView.as_view(template_name='public/process.html'), name="process"),
    path('projects/', TemplateView.as_view(template_name='public/projects.html'), name="projects"),
    path('maintenance/', TemplateView.as_view(template_name='public/maintenance.html'), name="maintenance"),
    path('market/', TemplateView.as_view(template_name='public/marketplace.html'), name="marketplace"),
    path('workflow/', TemplateView.as_view(template_name='public/workflow.html'), name="workflow"),
]