from . import api
from flask import jsonify

@api.route('/profile/')
def get_profile():
    response = jsonify(
        {
          "user_id": 1,
          "profile_picture_location": "http://dummyimage.com/223x152.jpg/dddddd/000000",
          "description": "quam nec dui luctus rutrum nulla tellus in sagittis dui"
        }, {
          "user_id": 2,
          "profile_picture_location": "http://dummyimage.com/164x156.bmp/ff4444/ffffff",
          "description": "non interdum in ante vestibulum ante ipsum primis in faucibus orci"
        }, {
          "user_id": 3,
          "profile_picture_location": "http://dummyimage.com/150x166.png/5fa2dd/ffffff",
          "description": "consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl"
        }, {
          "user_id": 4,
          "profile_picture_location": "http://dummyimage.com/103x172.bmp/cc0000/ffffff",
          "description": "id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui"
        }, {
          "user_id": 5,
          "profile_picture_location": "http://dummyimage.com/160x120.png/cc0000/ffffff",
          "description": "massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut"
        }, {
          "user_id": 6,
          "profile_picture_location": "http://dummyimage.com/117x149.png/ff4444/ffffff",
          "description": "dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo"
        }, {
          "user_id": 7,
          "profile_picture_location": "http://dummyimage.com/153x184.bmp/cc0000/ffffff",
          "description": "convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est"
        }, {
          "user_id": 8,
          "profile_picture_location": "http://dummyimage.com/197x127.bmp/5fa2dd/ffffff",
          "description": "proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut"
        }, {
          "user_id": 9,
          "profile_picture_location": "http://dummyimage.com/196x100.bmp/cc0000/ffffff",
          "description": "nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum"
        }, {
          "user_id": 10,
          "profile_picture_location": "http://dummyimage.com/138x184.png/cc0000/ffffff",
          "description": "accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum"
        }
    )

    return response
