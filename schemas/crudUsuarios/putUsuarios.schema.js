const putUsuariosEventSchema = {
  ok: {
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
    badRequest: {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Generated schema for Root",
  "type": "object",
  "properties": {
    "message": {
      "type": "string"
    },
    "_id": {
      "type": "string"
    }
  },
  "required": [
    "message",
    "_id"
  ]
  },
  badRequest200: {
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
  putUsuariosEventSchema
}