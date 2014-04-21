__author__ = 'Lorenzo Di Giuseppe'

from django.conf.urls import patterns, include, url
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
from django.views.generic import TemplateView

# urlpatterns = patterns('ita/',
#    url('^$', TemplateView.as_view(template_name='ita/home.html'), name='home'),
#    url('^chi-siamo/$', TemplateView.as_view(template_name='ita/chi-siamo.html'), name='chi-siamo'),
#    url('^cosa-facciamo/$', TemplateView.as_view(template_name='ita/cosa-facciamo.html'), name='cosa-facciamo'),
#    url('^dove-siamo/$', TemplateView.as_view(template_name='ita/dove-siamo.html'), name='dove-siamo'),
#    url('^contatti/$', TemplateView.as_view(template_name='ita/contatti.html'), name='contatti'),
#    url('^trasporti/$', TemplateView.as_view(template_name='ita/trasporti.html'), name='trasporti'),
#    url('^trasporti/gomma/$', TemplateView.as_view(template_name='ita/trasporto-su-gomma.html'), name='trasporto-gomma'),
#    url('^trasporti/ferroviario/$', TemplateView.as_view(template_name='ita/trasporto-ferroviario.html'), name='trasporto-ferroviario'),
#    url('^trasporti/marittimo/$', TemplateView.as_view(template_name='ita/trasporto-marittimo.html'), name='trasporto-marittimo'),
#    url('^trasporti/aereo/$', TemplateView.as_view(template_name='ita/trasporto-aereo.html'), name='trasporto-aereo'),
#    url('^trasporti/combinato/$', TemplateView.as_view(template_name='ita/trasporto-combinato.html'), name='trasporto-combinato'),
# )
#
# urlpatterns += patterns('eng/',
# 	url('^$', TemplateView.as_view(template_name='eng/home.html'), name='home'),
# 	url('^who-we-are/$', TemplateView.as_view(template_name='eng/chi-siamo.html'), name='chi-siamo'),
# 	url('^what-we-do/$', TemplateView.as_view(template_name='ita/cosa-facciamo.html'), name='cosa-facciamo'),
# 	url('^where-we-are/$', TemplateView.as_view(template_name='ita/dove-siamo.html'), name='dove-siamo'),
# 	url('^contacts/$', TemplateView.as_view(template_name='ita/contatti.html'), name='contatti'),
# 	url('^transports/$', TemplateView.as_view(template_name='ita/trasporti.html'), name='trasporti'),
# 	url('^transports/tyre/$', TemplateView.as_view(template_name='ita/trasporto-su-gomma.html'), name='trasporto-gomma'),
# 	url('^transports/rail/$', TemplateView.as_view(template_name='ita/trasporto-ferroviario.html'), name='trasporto-ferroviario'),
# 	url('^transports/maritime/$', TemplateView.as_view(template_name='ita/trasporto-marittimo.html'), name='trasporto-marittimo'),
# 	url('^transports/air/$', TemplateView.as_view(template_name='ita/trasporto-aereo.html'), name='trasporto-aereo'),
# 	url('^transports/combined/$', TemplateView.as_view(template_name='ita/trasporto-combinato.html'), name='trasporto-combinato'),
# )

urlpatterns = i18n_patterns('',
	url('^$', TemplateView.as_view(template_name='ita/home.html'), name='home'),
	url(_('^chi-siamo/$'), TemplateView.as_view(template_name='ita/chi-siamo.html'), name='chi-siamo'),
	url(_('^cosa-facciamo/$'), TemplateView.as_view(template_name='ita/cosa-facciamo.html'), name='cosa-facciamo'),
	url(_('^dove-siamo/$'), TemplateView.as_view(template_name='ita/dove-siamo.html'), name='dove-siamo'),
	url(_('^contatti/$'), TemplateView.as_view(template_name='ita/contatti.html'), name='contatti'),
)

urlpatterns += i18n_patterns(_('trasporti')+'/',
	url('^$', TemplateView.as_view(template_name='ita/trasporti.html'), name='trasporti'),
	url(_('^gomma/$'), TemplateView.as_view(template_name='ita/trasporto-su-gomma.html'), name='trasporto-gomma'),
	url(_('^ferroviario/$'), TemplateView.as_view(template_name='ita/trasporto-ferroviario.html'), name='trasporto-ferroviario'),
	url(_('^marittimo/$'), TemplateView.as_view(template_name='ita/trasporto-marittimo.html'), name='trasporto-marittimo'),
	url(_('^aereo/$'), TemplateView.as_view(template_name='ita/trasporto-aereo.html'), name='trasporto-aereo'),
	url(_('^combinato/$'), TemplateView.as_view(template_name='ita/trasporto-combinato.html'), name='trasporto-combinato'),
)