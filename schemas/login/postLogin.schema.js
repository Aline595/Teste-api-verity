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
  }
}

module.exports = {
  postLoginEventSchema
}