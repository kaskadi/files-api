![](https://img.shields.io/github/package-json/v/kaskadi/files-api)
![](https://img.shields.io/badge/code--style-standard-blue)
![](https://img.shields.io/github/license/kaskadi/files-api?color=blue)

**GitHub Actions workflows status**

[![](https://img.shields.io/github/workflow/status/kaskadi/files-api/deploy?label=deployed&logo=Amazon%20AWS)](https://github.com/kaskadi/files-api/actions?query=workflow%3Adeploy)
[![](https://img.shields.io/github/workflow/status/kaskadi/files-api/build?label=build&logo=mocha)](https://github.com/kaskadi/files-api/actions?query=workflow%3Abuild)
[![](https://img.shields.io/github/workflow/status/kaskadi/files-api/syntax-check?label=syntax-check&logo=serverless)](https://github.com/kaskadi/files-api/actions?query=workflow%3Asyntax-check)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/files-api?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/files-api)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/files-api?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/files-api)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/files-api?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/files-api)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/files-api?label=code%20quality&logo=LGTM)](https://lgtm.com/projects/g/kaskadi/files-api/?mode=list&logo=LGTM)

<!-- You can add badges inside of this section if you'd like -->

****

<!-- automatically generated documentation will be placed in here -->
# API endpoints

The origin and root path for this API is: `https://api.klimapartner.net/files`

The following endpoints are defined in this API:
- [/](#/)
- [/get-signed-url](#/get-signed-url)

## `/` <a name="/"></a>

Supported methods:
- [GET](#/-GET)

### `GET` (target lambda → [get-files](#get-files)) <a name="/-GET"></a>

**Description:**

This endpoint allows user to retrieve the list of files located at a given path inside of Kaskadi's public AWS S3 bucket.

**Authorization:**

|   Type  | Identity source                                       |
| :-----: | :---------------------------------------------------- |
| Cognito | <ul><li>method.request.header.Authorization</li></ul> |

**Query string parameters:**

|   Key  | Default | Description                                  |
| :----: | :-----: | :------------------------------------------- |
| `path` |   `/`   | Path from where we would like to list files. |

**Request body:**

No body found for this method.

**Examples:**

<details>
<summary>Example #1</summary>

_Request:_

```HTTP
GET https://api.klimapartner.net/files/?path=modules

Headers:
  Authorization: Bearer COGNITO_ACCESS_TOKEN
```

_Response:_

```HTTP
Status code:
  200

Headers:
  Access-Control-Allow-Origin: *

Body:
  [
    {
      "type": "folder",
      "size": 0,
      "lastModified": "2020-01-14T15:07:20.000Z",
      "path": "modules/@kaskadi/"
    },
    {
      "type": "folder",
      "size": 6272,
      "lastModified": "2020-01-14T15:20:06.000Z",
      "path": "modules/@webcomponents/"
    },
    {
      "type": "folder",
      "size": 0,
      "lastModified": "2020-03-09T07:30:12.000Z",
      "path": "modules/lit-element/"
    },
    {
      "type": "folder",
      "size": 0,
      "lastModified": "2020-03-09T07:30:13.000Z",
      "path": "modules/lit-html/"
    }
  ]
```
</details>

<details>
<summary>Example #2</summary>

_Request:_

```HTTP
GET https://api.klimapartner.net/files/?path=modulezzz

Headers:
  Authorization: Bearer COGNITO_ACCESS_TOKEN
```

_Response:_

```HTTP
Status code:
  404

Headers:
  Access-Control-Allow-Origin: *

Body:
  {
    "message": "No files found under modulezzz/"
  }
```
</details>

## `/get-signed-url` <a name="/get-signed-url"></a>

Supported methods:
- [POST](#get-signed-url-POST)

### `POST` (target lambda → [get-signed-url](#get-signed-url)) <a name="get-signed-url-POST"></a>

**Description:**

This endpoint provides a way for users to get signed URLs that allows them to upload content into Kaskadi's public AWS S3 bucket.

**Authorization:**

|   Type  | Identity source                                       |
| :-----: | :---------------------------------------------------- |
| Cognito | <ul><li>method.request.header.Authorization</li></ul> |

**Query string parameters:**

No query string parameters found for this method.

**Request body:**

|  Key  | Default | Description                                                                                                                   |
| :---: | :-----: | :---------------------------------------------------------------------------------------------------------------------------- |
| `key` |         | Key of the item you would like to upload on S3. Uses `/` as a separator to determine pseudo-folder structure to create on S3. |

**Examples:**

<details>
<summary>Example #1</summary>

_Request:_

```HTTP
POST https://api.klimapartner.net/files/get-signed-url

Headers:
  Authorization: Bearer COGNITO_ACCESS_TOKEN

Body:
  {
    "key": "imgs/apple.png"
  }
```

_Response:_

```HTTP
Status code:
  200

Headers:
  Access-Control-Allow-Origin: *

Body:
  {
    "presignedUrl": "https://some.signed.url/to/upload/file?where=in_cdn",
    "imgUrl": "https://cdn.klimapartner.net/imgs/apple.png"
  }
```
</details>

# API resources

The following lambda functions are used in this API:
- [get-files](#get-files)
- [get-signed-url](#get-signed-url)

The following layers are used in this API:
- [files-api-layer](#files-api-layer)

## get-files <a name="get-files"></a>

|    Name   | Sources                | Timeout |                   Handler                   | Layers                                                |
| :-------: | :--------------------- | :-----: | :-----------------------------------------: | :---------------------------------------------------- |
| get-files | <ul><li>HTTP</li></ul> | default | [handler](./lambdas/get-files/get-files.js) | <ul><li>[files-api-layer](#files-api-layer)</li></ul> |

See [configuration file](./serverless.yml) for more details.

## get-signed-url <a name="get-signed-url"></a>

|      Name      | Sources                | Timeout |                        Handler                        | Layers                                                |
| :------------: | :--------------------- | :-----: | :---------------------------------------------------: | :---------------------------------------------------- |
| get-signed-url | <ul><li>HTTP</li></ul> | default | [handler](./lambdas/get-signed-url/get-signed-url.js) | <ul><li>[files-api-layer](#files-api-layer)</li></ul> |

See [configuration file](./serverless.yml) for more details.

## files-api-layer <a name="files-api-layer"></a>

### Description

Layer for files-api

### Dependencies

- `aws-sdk` (local utility)
- `base64-js` (local utility)
- `buffer` (local utility)
- `events` (local utility)
- `files-api-utils` (local utility)
- `ieee754` (local utility)
- `isarray` (local utility)
- `jmespath` (local utility)
- `punycode` (local utility)
- `querystring` (local utility)
- `sax` (local utility)
- `url` (local utility)
- `uuid` (local utility)
- `xml2js` (local utility)
- `xmlbuilder` (local utility)

See [configuration file](./serverless.yml) for more details.

# Stack tags

You can use any tags (and their respective values) visible below to find ressources related to this stack on AWS. See [here](https://docs.amazonaws.cn/en_us/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) for more details.

| Tag          | Value     |
| :----------- | :-------- |
| app          | kaskadi   |
| service      | files-api |
| logical-unit | files     |
| type         | http      |
<!-- automatically generated documentation will be placed in here -->

<!-- You can customize this template as you'd like! -->