from rest_framework.pagination import (LimitOffsetPagination, PageNumberPagination)
from rest_framework import status
import pdb
import datetime, calendar
from datetime import timedelta
from hashlib import md5


class Fecha():
    def addFecha(dateTime, valor, opc='month'):
        # Si no envían fecha selecciona la actual
        if None == dateTime or '' == dateTime:
            dateTime = datetime.datetime.now()
        else:
            if type(dateTime) is str:
                # Convierte String To date
                dateTime = datetime.datetime.strptime(dateTime, '%Y-%m-%d %H:%M:%S')
        if 'month' == opc:
            month = dateTime.month - 1 + valor
            year = int(dateTime.year + month / 12)
            month = month % 12 + 1
            day = min(dateTime.day, calendar.monthrange(year, month)[1])
            datoReturn = datetime.date(year, month, day)
        if 'day' == opc:
            datoReturn = dateTime + datetime.timedelta(days=valor)
        if 'hours' == opc:
            datoReturn = dateTime + datetime.timedelta(hours=valor)
        if 'minutes' == opc:
            datoReturn = dateTime + datetime.timedelta(minutes=valor)
        return datoReturn

    def dateSystem(timestamp=True):
        date = datetime.datetime.now()
        if timestamp:
            return date
        return date.strftime("%Y-%m-%d")
