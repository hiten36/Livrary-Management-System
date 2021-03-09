from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='home_library'),
    path('contact',views.contact,name="contact"),
    path('about',views.about,name="about"),
    path('search',views.search,name='search'),
    path('signin',views.handlesignin),
    path('login',views.handlelogin),
    path('logout',views.handlelogout)
]
