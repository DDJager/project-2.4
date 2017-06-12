from . import api
from flask import jsonify
from main.models import auth

@api.route('/achievements/')
@auth.login_required
def get_achievements():
    response = jsonify(
        {
          "user_id": 1,
          "name": "Miconazole Nitrate",
          "description": "accumsan felis ut at dolor quis odio consequat varius integer"
        }, {
          "user_id": 2,
          "name": "Zolmitriptan",
          "description": "ac consequat metus sapien ut nunc vestibulum ante ipsum primis"
        }, {
          "user_id": 3,
          "name": "anti nausea",
          "description": "amet eleifend pede libero quis orci nullam molestie nibh in"
        }, {
          "user_id": 4,
          "name": "Trazodone Hydrochloride",
          "description": "vehicula condimentum curabitur in libero ut massa volutpat convallis morbi"
        }, {
          "user_id": 5,
          "name": "Preferred Plus Allergy Relief",
          "description": "metus sapien ut nunc vestibulum ante ipsum primis in faucibus"
        }, {
          "user_id": 6,
          "name": "Eye Wash",
          "description": "morbi non lectus aliquam sit amet diam in magna bibendum"
        }, {
          "user_id": 7,
          "name": "care one calcium antacid",
          "description": "faucibus orci luctus et ultrices posuere cubilia curae mauris viverra"
        }, {
          "user_id": 8,
          "name": "hemorrhoidal",
          "description": "pede venenatis non sodales sed tincidunt eu felis fusce posuere"
        }, {
          "user_id": 9,
          "name": "Lemon Glycerin",
          "description": "tortor quis turpis sed ante vivamus tortor duis mattis egestas"
        }, {
          "user_id": 10,
          "name": "SoftSoap Antibacterial",
          "description": "ac est lacinia nisi venenatis tristique fusce congue diam id"
        }
    )
    return response
