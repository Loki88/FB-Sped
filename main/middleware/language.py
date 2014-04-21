from django.utils.translation import activate
from django.core.urlresolvers import resolve, reverse
from django.http import HttpResponseRedirect, Http404

class LanguageMiddleware():

	def process_request(self, request):
		if request.method == "POST":
			if request.POST["language"] != None:
				path = request.path
				next = resolve(path)
				activate(request.POST["language"])
				if next != None:
					return HttpResponseRedirect(reverse(next.url_name))

	# def process_view(self, request, view_func, view_args, view_kwargs):
	# 	pass
	#
	# def process_template_response(self, request, response):
	# 	pass
	#
	# def process_response(self, request, response):
	# 	pass
	#
	# def process_exception(self, request, exception):
	# 	pass