from django.conf.urls.defaults import *
from django.views.generic import TemplateView
from core.views import HomeView
# import dbindexer

handler500 = 'djangotoolbox.errorviews.server_error'

# django admin
# admin.autodiscover()

# search for dbindexes.py in all INSTALLED_APPS and load them
# dbindexer.autodiscover()

urlpatterns = patterns('',
    (r'^$', TemplateView.as_view(template_name='index.html')),
    (r'^(?P<lang>ita|eng)/home/$', HomeView.as_view()),
    # ('^admin/', include(admin.site.urls)),
)
