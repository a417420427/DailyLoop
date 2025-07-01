/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/UserController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OcrHistoryController } from './../controllers/OcrHistoryController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OcrController } from './../controllers/OcrController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NoteController } from './../controllers/NoteController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ImageAnalysisController } from './../controllers/ImageAnalysisController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CopyGenerationHistoryController } from './../controllers/CopyGenerationHistoryController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controllers/AuthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AIController } from './../controllers/AIController';
import { expressAuthentication } from './../utils/auth';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';
const multer = require('multer');


const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Note": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "user_id": {"dataType":"string","required":true},
            "user": {"ref":"User","required":true},
            "title": {"dataType":"string"},
            "content": {"dataType":"string"},
            "created_at": {"dataType":"datetime","required":true},
            "updated_at": {"dataType":"datetime","required":true},
            "is_deleted": {"dataType":"boolean","required":true},
            "note_tags": {"dataType":"array","array":{"dataType":"refObject","ref":"NoteTag"},"required":true},
            "review_tasks": {"dataType":"array","array":{"dataType":"refObject","ref":"ReviewTask"},"required":true},
            "knowledge_nodes": {"dataType":"array","array":{"dataType":"refObject","ref":"KnowledgeNode"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "phone": {"dataType":"string"},
            "passwordHash": {"dataType":"string"},
            "username": {"dataType":"string"},
            "avatar_url": {"dataType":"string"},
            "wechat_openid": {"dataType":"string"},
            "created_at": {"dataType":"datetime","required":true},
            "updated_at": {"dataType":"datetime","required":true},
            "last_login_at": {"dataType":"datetime"},
            "is_active": {"dataType":"boolean","required":true},
            "notes": {"dataType":"array","array":{"dataType":"refObject","ref":"Note"},"required":true},
            "tags": {"dataType":"array","array":{"dataType":"refObject","ref":"Tag"},"required":true},
            "study_plans": {"dataType":"array","array":{"dataType":"refObject","ref":"StudyPlan"},"required":true},
            "review_tasks": {"dataType":"array","array":{"dataType":"refObject","ref":"ReviewTask"},"required":true},
            "ai_conversations": {"dataType":"array","array":{"dataType":"refObject","ref":"AIConversation"},"required":true},
            "knowledge_nodes": {"dataType":"array","array":{"dataType":"refObject","ref":"KnowledgeNode"},"required":true},
            "user_setting": {"ref":"UserSetting"},
            "copy_generation_histories": {"dataType":"array","array":{"dataType":"refObject","ref":"CopyGenerationHistory"},"required":true},
            "ocrRecords": {"dataType":"array","array":{"dataType":"refObject","ref":"OcrRecord"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Tag": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "user_id": {"dataType":"string","required":true},
            "user": {"ref":"User","required":true},
            "name": {"dataType":"string","required":true},
            "created_at": {"dataType":"datetime","required":true},
            "note_tags": {"dataType":"array","array":{"dataType":"refObject","ref":"NoteTag"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NoteTag": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "note_id": {"dataType":"string","required":true},
            "note": {"ref":"Note","required":true},
            "tag_id": {"dataType":"string","required":true},
            "tag": {"ref":"Tag","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StudyPlan": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "user_id": {"dataType":"string","required":true},
            "user": {"ref":"User","required":true},
            "title": {"dataType":"string"},
            "target_note_count": {"dataType":"double","required":true},
            "start_date": {"dataType":"string"},
            "end_date": {"dataType":"string"},
            "progress": {"dataType":"double","required":true},
            "created_at": {"dataType":"datetime","required":true},
            "updated_at": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewTask": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "user_id": {"dataType":"string","required":true},
            "user": {"ref":"User","required":true},
            "note_id": {"dataType":"string","required":true},
            "note": {"ref":"Note","required":true},
            "scheduled_time": {"dataType":"datetime"},
            "is_completed": {"dataType":"boolean","required":true},
            "created_at": {"dataType":"datetime","required":true},
            "updated_at": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AIConversation": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "user_id": {"dataType":"string","required":true},
            "user": {"ref":"User","required":true},
            "created_at": {"dataType":"datetime","required":true},
            "updated_at": {"dataType":"datetime","required":true},
            "messages": {"dataType":"array","array":{"dataType":"refObject","ref":"AIMessage"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AIMessage": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "conversation_id": {"dataType":"string","required":true},
            "conversation": {"ref":"AIConversation","required":true},
            "sender": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["user"]},{"dataType":"enum","enums":["ai"]}],"required":true},
            "content": {"dataType":"string"},
            "created_at": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "KnowledgeNode": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "note_id": {"dataType":"string","required":true},
            "note": {"ref":"Note","required":true},
            "user_id": {"dataType":"string","required":true},
            "user": {"ref":"User","required":true},
            "position_x": {"dataType":"double","required":true},
            "position_y": {"dataType":"double","required":true},
            "created_at": {"dataType":"datetime","required":true},
            "updated_at": {"dataType":"datetime","required":true},
            "from_edges": {"dataType":"array","array":{"dataType":"refObject","ref":"KnowledgeEdge"},"required":true},
            "to_edges": {"dataType":"array","array":{"dataType":"refObject","ref":"KnowledgeEdge"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "KnowledgeEdge": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "from_node_id": {"dataType":"string","required":true},
            "from_node": {"ref":"KnowledgeNode","required":true},
            "to_node_id": {"dataType":"string","required":true},
            "to_node": {"ref":"KnowledgeNode","required":true},
            "created_at": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserSetting": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "user_id": {"dataType":"string","required":true},
            "user": {"ref":"User","required":true},
            "sync_enabled": {"dataType":"boolean","required":true},
            "encryption_enabled": {"dataType":"boolean","required":true},
            "encryption_password_hash": {"dataType":"string"},
            "notification_enabled": {"dataType":"boolean","required":true},
            "updated_at": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CopyGenerationHistory": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "keywords": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "style": {"dataType":"string","required":true},
            "length": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["short"]},{"dataType":"enum","enums":["medium"]},{"dataType":"enum","enums":["long"]}],"required":true},
            "prompt": {"dataType":"string","required":true},
            "result": {"dataType":"string","required":true},
            "created_at": {"dataType":"datetime","required":true},
            "user": {"ref":"User","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OcrRecord": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "user": {"ref":"User","required":true},
            "user_id": {"dataType":"string","required":true},
            "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["ocr"]},{"dataType":"enum","enums":["document"]},{"dataType":"enum","enums":["scan"]}],"required":true},
            "image_url": {"dataType":"string"},
            "result": {"dataType":"any","required":true},
            "imageWidth": {"dataType":"double","required":true},
            "imageHeight": {"dataType":"double","required":true},
            "created_at": {"dataType":"datetime","required":true},
            "updated_at": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_User.Exclude_keyofUser.passwordHash__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true},"phone":{"dataType":"string"},"username":{"dataType":"string"},"avatar_url":{"dataType":"string"},"wechat_openid":{"dataType":"string"},"created_at":{"dataType":"datetime","required":true},"updated_at":{"dataType":"datetime","required":true},"last_login_at":{"dataType":"datetime"},"is_active":{"dataType":"boolean","required":true},"notes":{"dataType":"array","array":{"dataType":"refObject","ref":"Note"},"required":true},"tags":{"dataType":"array","array":{"dataType":"refObject","ref":"Tag"},"required":true},"study_plans":{"dataType":"array","array":{"dataType":"refObject","ref":"StudyPlan"},"required":true},"review_tasks":{"dataType":"array","array":{"dataType":"refObject","ref":"ReviewTask"},"required":true},"ai_conversations":{"dataType":"array","array":{"dataType":"refObject","ref":"AIConversation"},"required":true},"knowledge_nodes":{"dataType":"array","array":{"dataType":"refObject","ref":"KnowledgeNode"},"required":true},"user_setting":{"ref":"UserSetting"},"copy_generation_histories":{"dataType":"array","array":{"dataType":"refObject","ref":"CopyGenerationHistory"},"required":true},"ocrRecords":{"dataType":"array","array":{"dataType":"refObject","ref":"OcrRecord"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_User.passwordHash_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_User.Exclude_keyofUser.passwordHash__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NoteCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "content": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NoteUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "content": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Coord": {
        "dataType": "refObject",
        "properties": {
            "X": {"dataType":"double"},
            "Y": {"dataType":"double"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ItemCoord": {
        "dataType": "refObject",
        "properties": {
            "X": {"dataType":"double","required":true},
            "Y": {"dataType":"double","required":true},
            "Width": {"dataType":"double","required":true},
            "Height": {"dataType":"double","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DetectedWords": {
        "dataType": "refObject",
        "properties": {
            "Confidence": {"dataType":"double"},
            "Character": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DetectedWordCoordPoint": {
        "dataType": "refObject",
        "properties": {
            "WordCoordinate": {"dataType":"array","array":{"dataType":"refObject","ref":"Coord"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TextDetection": {
        "dataType": "refObject",
        "properties": {
            "DetectedText": {"dataType":"string","required":true},
            "Confidence": {"dataType":"double","required":true},
            "Polygon": {"dataType":"array","array":{"dataType":"refObject","ref":"Coord"},"required":true},
            "AdvancedInfo": {"dataType":"string","required":true},
            "ItemPolygon": {"ref":"ItemCoord","required":true},
            "Words": {"dataType":"array","array":{"dataType":"refObject","ref":"DetectedWords"},"required":true},
            "WordCoordPoint": {"dataType":"array","array":{"dataType":"refObject","ref":"DetectedWordCoordPoint"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GeneralBasicOCRResponse": {
        "dataType": "refObject",
        "properties": {
            "TextDetections": {"dataType":"array","array":{"dataType":"refObject","ref":"TextDetection"}},
            "Language": {"dataType":"string"},
            "Angel": {"dataType":"double"},
            "PdfPageSize": {"dataType":"double"},
            "Angle": {"dataType":"double"},
            "RequestId": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TextTable": {
        "dataType": "refObject",
        "properties": {
            "ColTl": {"dataType":"double","required":true},
            "RowTl": {"dataType":"double","required":true},
            "ColBr": {"dataType":"double","required":true},
            "RowBr": {"dataType":"double","required":true},
            "Text": {"dataType":"string","required":true},
            "Type": {"dataType":"string","required":true},
            "Confidence": {"dataType":"double","required":true},
            "Polygon": {"dataType":"array","array":{"dataType":"refObject","ref":"Coord"},"required":true},
            "AdvancedInfo": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TableOCRResponse": {
        "dataType": "refObject",
        "properties": {
            "TextDetections": {"dataType":"array","array":{"dataType":"refObject","ref":"TextTable"}},
            "Data": {"dataType":"string"},
            "RequestId": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QrcodePositionObj": {
        "dataType": "refObject",
        "properties": {
            "LeftTop": {"ref":"Coord","required":true},
            "RightTop": {"ref":"Coord","required":true},
            "RightBottom": {"ref":"Coord","required":true},
            "LeftBottom": {"ref":"Coord","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QrcodeResultsInfo": {
        "dataType": "refObject",
        "properties": {
            "TypeName": {"dataType":"string"},
            "Url": {"dataType":"string"},
            "Position": {"ref":"QrcodePositionObj"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QrcodeImgSize": {
        "dataType": "refObject",
        "properties": {
            "Wide": {"dataType":"double","required":true},
            "High": {"dataType":"double","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QrcodeOCRResponse": {
        "dataType": "refObject",
        "properties": {
            "CodeResults": {"dataType":"array","array":{"dataType":"refObject","ref":"QrcodeResultsInfo"}},
            "ImgSize": {"ref":"QrcodeImgSize"},
            "RequestId": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GenerateCopyRequest": {
        "dataType": "refObject",
        "properties": {
            "keywords": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "style": {"dataType":"string","required":true},
            "length": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["short"]},{"dataType":"enum","enums":["medium"]},{"dataType":"enum","enums":["long"]}],"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GenerateProductTitlesRequest": {
        "dataType": "refObject",
        "properties": {
            "productName": {"dataType":"string","required":true},
            "productPoints": {"dataType":"string","required":true},
            "targetAudience": {"dataType":"string"},
            "platform": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["淘宝"]},{"dataType":"enum","enums":["拼多多"]},{"dataType":"enum","enums":["京东"]}],"required":true},
            "tone": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["官方"]},{"dataType":"enum","enums":["亲切"]},{"dataType":"enum","enums":["潮流"]}],"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ExtractKeyPointsRequest": {
        "dataType": "refObject",
        "properties": {
            "description": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GenerateDetailPageCopyRequest": {
        "dataType": "refObject",
        "properties": {
            "productFeatures": {"dataType":"string","required":true},
            "keyPoints": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmbedHotWordsRequest": {
        "dataType": "refObject",
        "properties": {
            "titles": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "keyPoints": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GenerateLifeCopyRequest": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"withTags":{"dataType":"boolean"},"withImage":{"dataType":"boolean"},"emotion":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["快乐"]},{"dataType":"enum","enums":["沮丧"]},{"dataType":"enum","enums":["惊喜"]},{"dataType":"enum","enums":["感恩"]},{"dataType":"enum","enums":["疲惫"]},{"dataType":"enum","enums":["平静"]}]},"tone":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["治愈系"]},{"dataType":"enum","enums":["搞笑"]},{"dataType":"enum","enums":["励志"]},{"dataType":"enum","enums":["文艺"]},{"dataType":"enum","enums":["生活流"]},{"dataType":"enum","enums":["种草口吻"]}],"required":true},"keywords":{"dataType":"string","required":true},"scene":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["朋友圈"]},{"dataType":"enum","enums":["日记"]},{"dataType":"enum","enums":["小红书"]},{"dataType":"enum","enums":["节日祝福"]},{"dataType":"enum","enums":["随手记录"]}],"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"ignore","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router,opts?:{multer?:ReturnType<typeof multer>}) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################

    const upload = opts?.multer ||  multer({"limits":{"fileSize":8388608}});

    
        const argsUserController_getUserById: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
        };
        app.get('/users/:userId',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUserById)),

            async function UserController_getUserById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUserById, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUserById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_createUser: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"wechatOpenid":{"dataType":"string"},"username":{"dataType":"string","required":true},"password":{"dataType":"string","required":true},"phone":{"dataType":"string","required":true}}},
        };
        app.post('/users',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.createUser)),

            async function UserController_createUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_createUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'createUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsOcrHistoryController_getAggregatedHistory: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                page: {"in":"query","name":"page","dataType":"double"},
                pageSize: {"in":"query","name":"pageSize","dataType":"double"},
        };
        app.get('/ocr_history',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(OcrHistoryController)),
            ...(fetchMiddlewares<RequestHandler>(OcrHistoryController.prototype.getAggregatedHistory)),

            async function OcrHistoryController_getAggregatedHistory(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsOcrHistoryController_getAggregatedHistory, request, response });

                const controller = new OcrHistoryController();

              await templateService.apiHandler({
                methodName: 'getAggregatedHistory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsOcrController_recognizeText: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                file: {"in":"formData","name":"file","required":true,"dataType":"file"},
        };
        app.post('/ocr/recognize-text',
            authenticateMiddleware([{"jwt":[]}]),
            upload.fields([
                {
                    name: "file",
                    maxCount: 1
                }
            ]),
            ...(fetchMiddlewares<RequestHandler>(OcrController)),
            ...(fetchMiddlewares<RequestHandler>(OcrController.prototype.recognizeText)),

            async function OcrController_recognizeText(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsOcrController_recognizeText, request, response });

                const controller = new OcrController();

              await templateService.apiHandler({
                methodName: 'recognizeText',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsOcrController_scanCode: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                file: {"in":"formData","name":"file","required":true,"dataType":"file"},
        };
        app.post('/ocr/scan-code',
            authenticateMiddleware([{"jwt":[]}]),
            upload.fields([
                {
                    name: "file",
                    maxCount: 1
                }
            ]),
            ...(fetchMiddlewares<RequestHandler>(OcrController)),
            ...(fetchMiddlewares<RequestHandler>(OcrController.prototype.scanCode)),

            async function OcrController_scanCode(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsOcrController_scanCode, request, response });

                const controller = new OcrController();

              await templateService.apiHandler({
                methodName: 'scanCode',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsOcrController_extractDocument: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                file: {"in":"formData","name":"file","required":true,"dataType":"file"},
        };
        app.post('/ocr/extract-document',
            authenticateMiddleware([{"jwt":[]}]),
            upload.fields([
                {
                    name: "file",
                    maxCount: 1
                }
            ]),
            ...(fetchMiddlewares<RequestHandler>(OcrController)),
            ...(fetchMiddlewares<RequestHandler>(OcrController.prototype.extractDocument)),

            async function OcrController_extractDocument(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsOcrController_extractDocument, request, response });

                const controller = new OcrController();

              await templateService.apiHandler({
                methodName: 'extractDocument',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsNoteController_getNotes: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
        };
        app.get('/notes/user/:userId',
            ...(fetchMiddlewares<RequestHandler>(NoteController)),
            ...(fetchMiddlewares<RequestHandler>(NoteController.prototype.getNotes)),

            async function NoteController_getNotes(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsNoteController_getNotes, request, response });

                const controller = new NoteController();

              await templateService.apiHandler({
                methodName: 'getNotes',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsNoteController_getNote: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/notes/:id',
            ...(fetchMiddlewares<RequestHandler>(NoteController)),
            ...(fetchMiddlewares<RequestHandler>(NoteController.prototype.getNote)),

            async function NoteController_getNote(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsNoteController_getNote, request, response });

                const controller = new NoteController();

              await templateService.apiHandler({
                methodName: 'getNote',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsNoteController_createNote: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
                request: {"in":"body","name":"request","required":true,"ref":"NoteCreateRequest"},
        };
        app.post('/notes/user/:userId',
            ...(fetchMiddlewares<RequestHandler>(NoteController)),
            ...(fetchMiddlewares<RequestHandler>(NoteController.prototype.createNote)),

            async function NoteController_createNote(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsNoteController_createNote, request, response });

                const controller = new NoteController();

              await templateService.apiHandler({
                methodName: 'createNote',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsNoteController_updateNote: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
                request: {"in":"body","name":"request","required":true,"ref":"NoteUpdateRequest"},
        };
        app.put('/notes/:id/user/:userId',
            ...(fetchMiddlewares<RequestHandler>(NoteController)),
            ...(fetchMiddlewares<RequestHandler>(NoteController.prototype.updateNote)),

            async function NoteController_updateNote(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsNoteController_updateNote, request, response });

                const controller = new NoteController();

              await templateService.apiHandler({
                methodName: 'updateNote',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsNoteController_deleteNote: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
        };
        app.delete('/notes/:id/user/:userId',
            ...(fetchMiddlewares<RequestHandler>(NoteController)),
            ...(fetchMiddlewares<RequestHandler>(NoteController.prototype.deleteNote)),

            async function NoteController_deleteNote(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsNoteController_deleteNote, request, response });

                const controller = new NoteController();

              await templateService.apiHandler({
                methodName: 'deleteNote',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsImageAnalysisController_recognizeText: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"imageBase64":{"dataType":"string","required":true}}},
        };
        app.post('/image-analysis/ocr',
            ...(fetchMiddlewares<RequestHandler>(ImageAnalysisController)),
            ...(fetchMiddlewares<RequestHandler>(ImageAnalysisController.prototype.recognizeText)),

            async function ImageAnalysisController_recognizeText(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsImageAnalysisController_recognizeText, request, response });

                const controller = new ImageAnalysisController();

              await templateService.apiHandler({
                methodName: 'recognizeText',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsImageAnalysisController_extractDocument: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"imageBase64":{"dataType":"string","required":true}}},
        };
        app.post('/image-analysis/extract',
            ...(fetchMiddlewares<RequestHandler>(ImageAnalysisController)),
            ...(fetchMiddlewares<RequestHandler>(ImageAnalysisController.prototype.extractDocument)),

            async function ImageAnalysisController_extractDocument(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsImageAnalysisController_extractDocument, request, response });

                const controller = new ImageAnalysisController();

              await templateService.apiHandler({
                methodName: 'extractDocument',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsImageAnalysisController_scanCode: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"imageBase64":{"dataType":"string","required":true}}},
        };
        app.post('/image-analysis/code',
            ...(fetchMiddlewares<RequestHandler>(ImageAnalysisController)),
            ...(fetchMiddlewares<RequestHandler>(ImageAnalysisController.prototype.scanCode)),

            async function ImageAnalysisController_scanCode(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsImageAnalysisController_scanCode, request, response });

                const controller = new ImageAnalysisController();

              await templateService.apiHandler({
                methodName: 'scanCode',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCopyGenerationHistoryController_getUserHistories: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                page: {"in":"query","name":"page","dataType":"double"},
                pageSize: {"in":"query","name":"pageSize","dataType":"double"},
        };
        app.get('/copy-history',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CopyGenerationHistoryController)),
            ...(fetchMiddlewares<RequestHandler>(CopyGenerationHistoryController.prototype.getUserHistories)),

            async function CopyGenerationHistoryController_getUserHistories(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCopyGenerationHistoryController_getUserHistories, request, response });

                const controller = new CopyGenerationHistoryController();

              await templateService.apiHandler({
                methodName: 'getUserHistories',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_sendCode: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"phone":{"dataType":"string","required":true}}},
        };
        app.post('/auth/send-code',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.sendCode)),

            async function AuthController_sendCode(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_sendCode, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'sendCode',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_login: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"code":{"dataType":"string","required":true},"phone":{"dataType":"string","required":true}}},
        };
        app.post('/auth/login',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.login)),

            async function AuthController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_loginByPassword: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true},"phone":{"dataType":"string","required":true}}},
        };
        app.post('/auth/login-by-password',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.loginByPassword)),

            async function AuthController_loginByPassword(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_loginByPassword, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'loginByPassword',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_register: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"username":{"dataType":"string"},"password":{"dataType":"string","required":true},"phone":{"dataType":"string","required":true}}},
        };
        app.post('/auth/register',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.register)),

            async function AuthController_register(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_register, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'register',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAIController_deepseek: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"GenerateCopyRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/ai/deepseek',
            ...(fetchMiddlewares<RequestHandler>(AIController)),
            ...(fetchMiddlewares<RequestHandler>(AIController.prototype.deepseek)),

            async function AIController_deepseek(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAIController_deepseek, request, response });

                const controller = new AIController();

              await templateService.apiHandler({
                methodName: 'deepseek',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAIController_generateProductTitles: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"GenerateProductTitlesRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/ai/generate-product-titles',
            ...(fetchMiddlewares<RequestHandler>(AIController)),
            ...(fetchMiddlewares<RequestHandler>(AIController.prototype.generateProductTitles)),

            async function AIController_generateProductTitles(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAIController_generateProductTitles, request, response });

                const controller = new AIController();

              await templateService.apiHandler({
                methodName: 'generateProductTitles',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAIController_extractKeyPoints: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"ExtractKeyPointsRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/ai/extract-key-points',
            ...(fetchMiddlewares<RequestHandler>(AIController)),
            ...(fetchMiddlewares<RequestHandler>(AIController.prototype.extractKeyPoints)),

            async function AIController_extractKeyPoints(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAIController_extractKeyPoints, request, response });

                const controller = new AIController();

              await templateService.apiHandler({
                methodName: 'extractKeyPoints',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAIController_chatgpt: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"prompt":{"dataType":"string","required":true}}},
        };
        app.post('/ai/chatgpt',
            ...(fetchMiddlewares<RequestHandler>(AIController)),
            ...(fetchMiddlewares<RequestHandler>(AIController.prototype.chatgpt)),

            async function AIController_chatgpt(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAIController_chatgpt, request, response });

                const controller = new AIController();

              await templateService.apiHandler({
                methodName: 'chatgpt',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAIController_generateDetailPageCopy: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"GenerateDetailPageCopyRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/ai/generate-detail-page-copy',
            ...(fetchMiddlewares<RequestHandler>(AIController)),
            ...(fetchMiddlewares<RequestHandler>(AIController.prototype.generateDetailPageCopy)),

            async function AIController_generateDetailPageCopy(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAIController_generateDetailPageCopy, request, response });

                const controller = new AIController();

              await templateService.apiHandler({
                methodName: 'generateDetailPageCopy',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAIController_embedHotWords: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"EmbedHotWordsRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/ai/embed-hot-words',
            ...(fetchMiddlewares<RequestHandler>(AIController)),
            ...(fetchMiddlewares<RequestHandler>(AIController.prototype.embedHotWords)),

            async function AIController_embedHotWords(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAIController_embedHotWords, request, response });

                const controller = new AIController();

              await templateService.apiHandler({
                methodName: 'embedHotWords',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAIController_generateLifeCopy: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"GenerateLifeCopyRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/ai/generate-life-copy',
            ...(fetchMiddlewares<RequestHandler>(AIController)),
            ...(fetchMiddlewares<RequestHandler>(AIController.prototype.generateLifeCopy)),

            async function AIController_generateLifeCopy(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAIController_generateLifeCopy, request, response });

                const controller = new AIController();

              await templateService.apiHandler({
                methodName: 'generateLifeCopy',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
