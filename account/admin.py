from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from django.utils.translation import gettext, gettext_lazy as _

from .models import User

class CustomUserAdmin(UserAdmin):
    """ Custom User Admin
    """
    model = User
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'position',)}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

    readonly_fields = ('date_joined',)
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions',)
    list_display = ('email', 'first_name', 'last_name', 'position', 'date_joined',)
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )

admin.site.register(User, CustomUserAdmin)
