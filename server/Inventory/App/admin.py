from django.contrib import admin
from .models import userLogin, Profile, Product

@admin.register(userLogin)
class UserLoginAdmin(admin.ModelAdmin):
    list_display = ['username', 'userType']
    list_filter = ['userType']
    search_fields = ['username']

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['firstName', 'lastName', 'phone','profilePicture']
    search_fields = ['firstName', 'lastName']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['productName', 'price', 'quantity',]
    search_fields = ['productName']
    