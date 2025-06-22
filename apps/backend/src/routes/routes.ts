/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/UserController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NoteController } from './../controllers/NoteController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controllers/AuthController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



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
    "Pick_User.Exclude_keyofUser.passwordHash__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true},"phone":{"dataType":"string"},"username":{"dataType":"string"},"avatar_url":{"dataType":"string"},"wechat_openid":{"dataType":"string"},"created_at":{"dataType":"datetime","required":true},"updated_at":{"dataType":"datetime","required":true},"last_login_at":{"dataType":"datetime"},"is_active":{"dataType":"boolean","required":true},"notes":{"dataType":"array","array":{"dataType":"refObject","ref":"Note"},"required":true},"tags":{"dataType":"array","array":{"dataType":"refObject","ref":"Tag"},"required":true},"study_plans":{"dataType":"array","array":{"dataType":"refObject","ref":"StudyPlan"},"required":true},"review_tasks":{"dataType":"array","array":{"dataType":"refObject","ref":"ReviewTask"},"required":true},"ai_conversations":{"dataType":"array","array":{"dataType":"refObject","ref":"AIConversation"},"required":true},"knowledge_nodes":{"dataType":"array","array":{"dataType":"refObject","ref":"KnowledgeNode"},"required":true},"user_setting":{"ref":"UserSetting"}},"validators":{}},
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
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"ignore","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
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

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
