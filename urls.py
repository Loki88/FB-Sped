__author__ = 'Lorenzo Di Giuseppe'

from django.conf.urls import patterns, include, url
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
from django.views.generic import TemplateView


# import dbindexer

handler500 = 'djangotoolbox.errorviews.server_error'

# django admin
# admin.autodiscover()

# search for dbindexes.py in all INSTALLED_APPS and load them
# dbindexer.autodiscover()
urlpatterns = patterns('',
   (r'^i18n/', include('django.conf.urls.i18n')),
)

urlpatterns += i18n_patterns('',
	url('^$', TemplateView.as_view(template_name='main/home.html'), name='home'),
	url(_('^chi-siamo/$'), TemplateView.as_view(template_name='main/chi-siamo.html'), name='chi-siamo'),
	url(_('^cosa-facciamo/$'), TemplateView.as_view(template_name='main/cosa-facciamo.html'), name='cosa-facciamo'),
	url(_('^dove-siamo/$'), TemplateView.as_view(template_name='main/dove-siamo.html'), name='dove-siamo'),
	url(_('^contatti/$'), TemplateView.as_view(template_name='main/contatti.html'), name='contatti'),
)

urlpatterns += i18n_patterns('',
	 url(_('^trasporti/$'), TemplateView.as_view(template_name='main/trasporti/trasporti.html'), name='trasporti'),
	 url(_('^trasporti/gomma/$'), TemplateView.as_view(template_name='main/trasporti/trasporto-su-gomma.html'), name='trasporto-gomma'),
	 url(_('^trasporti/ferroviario/$'), TemplateView.as_view(template_name='main/trasporti/trasporto-ferroviario.html'), name='trasporto-ferroviario'),
	 url(_('^trasporti/marittimo/$'), TemplateView.as_view(template_name='main/trasporti/trasporto-marittimo.html'), name='trasporto-marittimo'),
	 url(_('^trasporti/aereo/$'), TemplateView.as_view(template_name='main/trasporti/trasporto-aereo.html'), name='trasporto-aereo'),
	 url(_('^trasporti/combinato/$'), TemplateView.as_view(template_name='main/trasporti/trasporto-combinato.html'), name='trasporto-combinato'),
 )

