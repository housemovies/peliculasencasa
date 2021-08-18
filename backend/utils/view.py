from django.db.models import Q


class Views:

    @staticmethod
    def filtro(request, filtro, model):
        filter = Q()
        for key in filtro:
            if request.GET.get(filtro[key], None) is not None:
                filter.add(Q(**{key: request.GET.get(filtro[key], None)}), Q.OR)
        return model.filter(filter)

    @staticmethod
    def select(request, filtro, model, values, limit=5):
        filter = Q()
        for key in filtro:
            if request.GET.get(filtro[key], None) is not None:
                filter.add(Q(**{key: request.GET.get(filtro[key], None)}), Q.OR)

        # if request.GET.get('init', None) is not None:
        #     filter.add(Q(**{'id': request.GET.get('init', None)}), Q.OR)

        return model.filter(filter).values(*values)[:limit]
