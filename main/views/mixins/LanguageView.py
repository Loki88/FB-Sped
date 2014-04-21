__author__ = 'Lorenzo Di Giuseppe'
from django.views.generic.base import ContextMixin

class LanguageMixin(ContextMixin):

	def get_context_data(self, **kwargs):
		context = super(LanguageMixin, self).get_context_data(**kwargs)
		context['lang'] = self.request.language
		return context