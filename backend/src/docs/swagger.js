const swaggerUi = require("swagger-ui-express");

const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Store API",
        version: "1.0.0",
        description: "API para la tienda online"
    },
    servers: [
        {
            url: "http://localhost:5000"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    paths: {

        "/api/auth/register": {
            post: {
                tags: ["Auth"],
                summary: "Registrar cliente",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        example: "Cristian Buitrago"
                                    },
                                    email: {
                                        type: "string",
                                        example: "cristian@test.com"
                                    },
                                    password: {
                                        type: "string",
                                        example: "123456"
                                    },
                                    phone: {
                                        type: "string",
                                        example: "3001234567"
                                    },
                                    address: {
                                        type: "string",
                                        example: "Bogotá"
                                    }
                                },
                                required: [
                                    "name",
                                    "email",
                                    "password"
                                ]
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Usuario creado correctamente"
                    },
                    400: {
                        description: "Email ya registrado"
                    }
                }
            }
        },

        "/api/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Iniciar sesión",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: {
                                        type: "string",
                                        example: "cristian@test.com"
                                    },
                                    password: {
                                        type: "string",
                                        example: "123456"
                                    }
                                },
                                required: [
                                    "email",
                                    "password"
                                ]
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Login exitoso"
                    },
                    400: {
                        description: "Credenciales inválidas"
                    }
                }
            }
        },

        "/api/auth/register-admin": {
            post: {
                tags: ["Auth"],
                summary: "Registrar administrador",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        example: "Juan Perez"
                                    },
                                    email: {
                                        type: "string",
                                        example: "admin@test.com"
                                    },
                                    password: {
                                        type: "string",
                                        example: "123456"
                                    },
                                    phone: {
                                        type: "string",
                                        example: "3001234567"
                                    },
                                    address: {
                                        type: "string",
                                        example: "Bogotá"
                                    }
                                },
                                required: [
                                    "name",
                                    "email",
                                    "password"
                                ]
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Administrador creado correctamente"
                    },
                    400: {
                        description: "Datos inválidos"
                    },
                    401: {
                        description: "Token inválido o no enviado"
                    },
                    403: {
                        description: "No tiene permisos para realizar esta acción"
                    }
                }
            }
        },

        "/api/users": {
            get: {
                tags: ["Users"],
                summary: "Obtener todos los usuarios",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description:
                            "Lista de usuarios"
                    },
                    401: {
                        description:
                            "No autenticado"
                    },
                    403: {
                        description:
                            "Sin permisos"
                    }
                }
            }
        },

        "/api/users/{id}": {
            get: {
                tags: ["Users"],
                summary: "Obtener usuario por id",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        },
                        description:
                            "Id del usuario"
                    }
                ],
                responses: {
                    200: {
                        description:
                            "Usuario encontrado"
                    },
                    404: {
                        description:
                            "Usuario no encontrado"
                    }
                }
            }
        },

        "/api/products": {
            get: {
                tags: ["Products"],
                summary: "Obtener todos los productos",
                responses: {
                    200: {
                        description: "Lista de productos"
                    }
                }
            },

            post: {
                tags: ["Products"],
                summary: "Crear producto",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        example: "Laptop Gamer"
                                    },
                                    description: {
                                        type: "string",
                                        example: "RTX 5070"
                                    },
                                    image: {
                                        type: "string",
                                        example: "https://imagen.com/laptop.jpg"
                                    },
                                    price: {
                                        type: "number",
                                        example: 4500000
                                    },
                                    stock: {
                                        type: "integer",
                                        example: 5
                                    }
                                },
                                required: [
                                    "name",
                                    "price"
                                ]
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Producto creado"
                    },
                    401: {
                        description: "No autenticado"
                    },
                    403: {
                        description: "Sin permisos"
                    }
                }
            }
        },

        "/api/products/{id}": {
            get: {
                tags: ["Products"],
                summary: "Obtener producto por id",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        },
                        description: "Id del producto"
                    }
                ],
                responses: {
                    200: {
                        description: "Producto encontrado"
                    },
                    404: {
                        description: "Producto no encontrado"
                    }
                }
            },
            put: {
                tags: ["Products"],
                summary: "Actualizar producto",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        },
                        description: "Id del producto"
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        example: "Laptop Gamer Actualizada"
                                    },
                                    description: {
                                        type: "string",
                                        example: "RTX 5070 Actualizada"
                                    },
                                    image: {
                                        type: "string",
                                        example: "https://imagen.com/laptop_actualizada.jpg"
                                    },
                                    price: {
                                        type: "number",
                                        example: 4600000
                                    },
                                    stock: {
                                        type: "integer",
                                        example: 10
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Producto actualizado"
                    },
                    401: {
                        description: "No autenticado"
                    },
                    403: {
                        description: "Sin permisos"
                    },
                    404: {
                        description: "Producto no encontrado"
                    }
                }
            },
            delete: {
                tags: ["Products"],
                summary: "Eliminar producto",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        },
                        description: "Id del producto"
                    }
                ],
                responses: {
                    200: {
                        description: "Producto eliminado"
                    },
                    401: {
                        description: "No autenticado"
                    },
                    403: {
                        description: "Sin permisos"
                    },
                    404: {
                        description: "Producto no encontrado"
                    }
                }
            }
        },

        "/api/orders": {
            post: {
                tags: ["Orders"],
                summary: "Crear pedido",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    products: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                productId: {
                                                    type: "integer",
                                                    example: 1
                                                },
                                                quantity: {
                                                    type: "integer",
                                                    example: 2
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description:
                            "Pedido creado"
                    }
                }
            },
            get: {
                tags: ["Orders"],
                summary: "Obtener todos los pedidos",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description:
                            "Lista de pedidos"
                    },
                    401: {
                        description:
                            "No autenticado"
                    },
                    403: {
                        description:
                            "Sin permisos"
                    }
                }
            }

        },

        "/api/orders/user": {
            get: {
                tags: ["Orders"],
                summary: "Obtener pedidos del usuario autenticado",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description:
                            "Lista de pedidos del usuario"
                    },
                    401: {
                        description:
                            "No autenticado"
                    }
                }
            }
        },
        "/api/orders/{id}": {
            get: {
                tags: ["Orders"],
                summary: "Obtener detalle de un pedido",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        }
                    }
                ],
                responses: {
                    200: {
                        description:
                            "Detalle del pedido"
                    },
                    404: {
                        description:
                            "Pedido no encontrado"
                    }
                }
            }
        },
        
        "/api/orders/{id}/status": {
            put: {
                tags: ["Orders"],
                summary: "Cambiar estado de un pedido",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer"
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "string",
                                        enum: [
                                            "PENDIENTE",
                                            "APROBADO",
                                            "RECHAZADO",
                                            "ENVIADO",
                                            "ENTREGADO"
                                        ],
                                        example:
                                            "APROBADO"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description:
                            "Estado actualizado"
                    }
                }
            }
        }

        

    }
};

module.exports = {
    swaggerUi,
    swaggerDocument
};