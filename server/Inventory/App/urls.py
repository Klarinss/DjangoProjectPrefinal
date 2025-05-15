
from django.urls import path

from .views import get_users,add_users,login_view,signup_view,login_viewData,profile_detail,productList

urlpatterns = [
    path('users/',get_users, name='get_users'),
    path('users/addUser/',add_users, name='add_users'),
    path('login/', login_view,name='login'),
    path('signup/', signup_view, name='signup'),
    path('usersData/', login_viewData,name='login'),
    path('usersData/<int:pk>/profile/', profile_detail, name='user-profile'),
    path('profiles/', profile_detail, name='profile-list'),
    path('products/', productList, name='product-list'),
    path('products/<int:pk>/', productList, name='product-detail'),
]
