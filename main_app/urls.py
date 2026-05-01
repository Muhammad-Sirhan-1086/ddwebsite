from django.urls import path
from . import views

urlpatterns = [
    path('', views.website, name='website'),
    path('portfolio/', views.portfolio, name='portfolio'),
]
