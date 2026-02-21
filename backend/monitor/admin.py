from django.contrib import admin

from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'status', 'updated_at')
    list_filter = ('status',)
    search_fields = ('name',)
