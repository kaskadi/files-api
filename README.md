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

The following endpoints are defined in this API:
- [/](#/)
- [/get-signed-url](#/get-signed-url)

## `/` (target lambda → [get-files](#get-files)) <a name="/"></a>

Supported methods:
- [GET](#GET)

### `GET`

**Description:**

This endpoint allows user to retrieve the list of files located at a given path inside of Kaskadi's public AWS S3 bucket.

**Query string parameters:**

|   Key  | Default | Description                                  |
| :----: | :-----: | :------------------------------------------- |
| `path` |   `/`   | Path from where we would like to list files. |

**Request body:**

No body found for this method.

_Example request:_

```HTTP
GET /?path=path_value
```

## `/get-signed-url` (target lambda → [get-signed-url](#get-signed-url)) <a name="/get-signed-url"></a>

Supported methods:
- [POST](#POST)

### `POST`

**Description:**

This endpoint provides a way for users to get signed URLs that allows them to upload content into Kaskadi's public AWS S3 bucket.

**Query string parameters:**

No query string parameters found for this method.

**Request body:**

|  Key  | Default | Description                                                                                                                   |
| :---: | :-----: | :---------------------------------------------------------------------------------------------------------------------------- |
| `key` |         | Key of the item you would like to upload on S3. Uses `/` as a separator to determine pseudo-folder structure to create on S3. |

_Example request:_

```HTTP
POST /get-signed-url

{
  "key": "key_value"
}
```

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

- `files-api-utils` (local utility)

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