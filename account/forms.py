from django import forms
from django.utils.translation import ugettext_lazy as _
from wagtail.users.forms import UserEditForm, UserCreationForm

from .models import User


class CustomUserEditForm(UserEditForm):
    position = forms.ChoiceField(required=True, choices=User.POSITION_TYPE, label=_("Position"))
    avatar = forms.FileField(widget=forms.ClearableFileInput(), label=_("Profile Picture"), required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        
class CustomUserCreationForm(UserCreationForm):
    position = forms.ChoiceField(required=True, choices=User.POSITION_TYPE, label=_("Position"))
    avatar = forms.FileField(widget=forms.ClearableFileInput(), label=_("Profile Picture"),  required=False)