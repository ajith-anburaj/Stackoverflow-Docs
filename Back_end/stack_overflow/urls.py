from django.urls import path
from . import views
app_name = "stack_overflow"

urlpatterns = [
    path('home/', views.home, name='home'),
    path('docs/', views.docs, name='docs'),
    path('topics/<int:doc_id>/', views.topics, name='topics'),
    path('examples/<int:topic_id>/', views.examples, name='examples'),
]