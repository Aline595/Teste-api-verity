const postLoginEventSchema = {
  ok: {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Generated schema for Root",
    "type": "object",
    "properties": {
        "message": {
        "type": "string"
        },
        "authorization": {
        "type": "string"
        }
    },
    "required": [
        "message",
        "authorization"
    ]
  },
  badRequest: {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Generated schema for Root",
    "type": "object",
    "properties": {
        "message": {
        "type": "string"
        }
    },
    "required": [
        "message"
    ]
  },
  badRequest400: {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Generated schema for Root",
  "type": "object",
  "properties": {
    "email": {
      "type": "string"
    }
  },
  "required": [
    "email"
  ]
}
,
  badRequestpassword: {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Generated schema for Root",
  "type": "object",
  "properties": {
    "email": {
      "type": "string"
    }
  },
  "required": [
    "password"
  ]
}

}

module.exports = {
  postLoginEventSchema
}