from . import api
from flask import jsonify
from main.models import auth

@api.route('/friendships/')
@auth.login_required
def get_friendships():
    # @TODO
    response = jsonify(
        {
          "id": 1,
          "username": "mclowes0",
          "email": "kglassup0@ustream.tv"
        }, {
          "id": 2,
          "username": "ajentges1",
          "email": "kespinoza1@skyrock.com"
        }, {
          "id": 3,
          "username": "bsurmanwells2",
          "email": "aloyndon2@privacy.gov.au"
        }, {
          "id": 4,
          "username": "wgreeno3",
          "email": "ceim3@newyorker.com"
        }, {
          "id": 5,
          "username": "jfigurski4",
          "email": "hpetrazzi4@examiner.com"
        }, {
          "id": 6,
          "username": "jdybell5",
          "email": "dhilbourne5@tripod.com"
        }, {
          "id": 7,
          "username": "adodsworth6",
          "email": "ptolchar6@ted.com"
        }, {
          "id": 8,
          "username": "mbream7",
          "email": "cswadlinge7@hud.gov"
        }, {
          "id": 9,
          "username": "apanter8",
          "email": "awebberley8@techcrunch.com"
        }, {
          "id": 10,
          "username": "eivchenko9",
          "email": "sciccotto9@google.co.jp"
        }
    )

    return response
