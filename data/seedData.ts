import type { SolutionRecord } from '../types';

export const seedRecords: SolutionRecord[] = [
    {
      id: 'sol-seed-1',
      companyType: 'Tienda de Ropa',
      niche: 'Retail de moda',
      problemDescription: 'La tienda de ropa enfrenta problemas de desabastecimiento en productos populares y exceso de inventario en otros artículos.',
      businessArea: 'logistics',
      result: {
        problemAnalysis: {
          identifiedProblem: 'Gestión de inventario ineficiente y desequilibrada.',
          impact: 'Pérdida de ventas por falta de stock en productos de alta demanda y capital inmovilizado en artículos de baja rotación, afectando la rentabilidad.'
        },
        shortTermSolution: {
          title: 'Implementación de Alertas de Stock',
          summary: 'Crear un sistema automatizado de alertas para notificar cuando los niveles de stock de productos populares alcancen un umbral mínimo y para identificar artículos sin ventas por más de 60 días.',
          steps: [
            { step: 1, title: 'Definir Umbrales', description: 'Establecer niveles mínimos y máximos de stock para los 20 productos más vendidos.' },
            { step: 2, title: 'Configurar Alertas', description: 'Usar el sistema de punto de venta (POS) para generar alertas automáticas por correo electrónico.' },
            { step: 3, title: 'Revisión Semanal', description: 'Realizar una reunión semanal para revisar las alertas y tomar decisiones de reposición o liquidación.' }
          ]
        },
        longTermSolution: {
          title: 'Análisis Predictivo de Demanda',
          summary: 'Utilizar un modelo de IA para analizar datos históricos de ventas y tendencias de temporada para predecir la demanda futura y optimizar las compras.',
          steps: [
            { step: 1, title: 'Recopilar Datos', description: 'Consolidar datos de ventas de los últimos 2 años desde el POS y el sitio web.' },
            { step: 2, title: 'Implementar Herramienta de IA', description: 'Contratar un software de IA que se integre con los datos para generar pronósticos.' },
            { step: 3, title: 'Automatizar Pedidos', description: 'Configurar el sistema para que genere borradores de órdenes de compra basados en las predicciones.' }
          ],
          isPremium: true
        }
      },
      timestamp: new Date(Date.now() - 22 * 86400000).toISOString(),
    },
    {
      id: 'sol-seed-2',
      companyType: 'Empresa de Servicios Digitales',
      niche: 'Publicidad Online',
      problemDescription: 'Una empresa está gastando mucho en campañas publicitarias online pero no está logrando los resultados esperados (baja conversión).',
      businessArea: 'marketing',
      result: {
        problemAnalysis: {
          identifiedProblem: 'Segmentación de audiencia y asignación de presupuesto ineficaces en campañas de marketing digital.',
          impact: 'Bajo retorno de la inversión publicitaria (ROAS), costo de adquisición de clientes (CAC) elevado y desperdicio de presupuesto.'
        },
        shortTermSolution: {
          title: 'Optimización de Campañas Activas',
          summary: 'Ajustar la segmentación y el presupuesto de las campañas en curso basándose en los datos de rendimiento de la última semana para mejorar los resultados inmediatos.',
          steps: [
            { step: 1, title: 'Analizar Audiencias', description: 'Identificar los segmentos de audiencia con mayor tasa de conversión en los últimos 7 días.' },
            { step: 2, title: 'Reasignar Presupuesto', description: 'Pausar los conjuntos de anuncios con bajo rendimiento y reasignar su presupuesto a los de mayor éxito.' },
            { step: 3, title: 'Test A/B de Creativos', description: 'Lanzar dos nuevas variaciones de los anuncios más efectivos para encontrar el mensaje óptimo.' }
          ],
          isPremium: true
        },
        longTermSolution: {
          title: 'Automatización de Puja con IA',
          summary: 'Implementar una estrategia de puja inteligente que utilice IA para ajustar automáticamente las ofertas en tiempo real, maximizando las conversiones al menor costo posible.',
          steps: [
            { step: 1, title: 'Configurar Seguimiento', description: 'Asegurarse de que el píxel de seguimiento de conversiones esté correctamente instalado y mida todas las acciones clave.' },
            { step: 2, title: 'Elegir Estrategia de Puja', description: 'Seleccionar una estrategia de puja automatizada en la plataforma publicitaria, como "Maximizar conversiones".' },
            { step: 3, title: 'Fase de Aprendizaje', description: 'Permitir que el algoritmo de IA aprenda durante al menos una semana sin hacer cambios importantes para que pueda optimizar eficazmente.' }
          ]
        }
      },
      timestamp: new Date(Date.now() - 21 * 86400000).toISOString(),
    },
    {
      id: 'sol-seed-3',
      companyType: 'E-commerce',
      niche: 'Atención al Cliente',
      problemDescription: 'La empresa recibe demasiadas consultas repetitivas por email y chat (preguntas frecuentes) que saturan al equipo de soporte.',
      businessArea: 'general',
      result: {
        problemAnalysis: {
          identifiedProblem: 'Falta de un sistema de autoservicio para la resolución de consultas comunes de clientes.',
          impact: 'Tiempos de respuesta lentos, baja satisfacción del cliente y un equipo de soporte sobrecargado y poco eficiente.'
        },
        shortTermSolution: {
          title: 'Creación de Base de Conocimiento (FAQ)',
          summary: 'Desarrollar una sección de Preguntas Frecuentes (FAQ) bien estructurada y visible en el sitio web para que los clientes encuentren respuestas por sí mismos.',
          steps: [
            { step: 1, title: 'Identificar Consultas', description: 'Analizar los últimos 100 tickets de soporte para identificar las 10 preguntas más repetidas.' },
            { step: 2, title: 'Redactar Respuestas', description: 'Crear respuestas claras y concisas para cada una de esas preguntas.' },
            { step: 3, title: 'Publicar y Promocionar', description: 'Publicar la sección de FAQ y añadir enlaces a ella en el pie de página, chat y correos de confirmación.' }
          ]
        },
        longTermSolution: {
          title: 'Implementación de Chatbot con IA',
          summary: 'Integrar un chatbot entrenado con la base de conocimiento para que pueda responder automáticamente a las preguntas frecuentes 24/7 y escalar casos complejos a un agente humano.',
          steps: [
            { step: 1, title: 'Seleccionar Plataforma', description: 'Elegir una plataforma de chatbot que se integre con el sitio web y los sistemas existentes.' },
            { step: 2, title: 'Entrenar el Chatbot', description: 'Alimentar al chatbot con las preguntas y respuestas de la base de conocimiento y el historial de chats.' },
            { step: 3, title: 'Definir Flujos', description: 'Crear flujos de conversación para guiar al usuario y definir cuándo y cómo escalar la conversación a un humano.' }
          ],
          isPremium: true
        }
      },
      timestamp: new Date(Date.now() - 20 * 86400000).toISOString(),
    },
    {
      id: 'sol-seed-4',
      companyType: 'Consultora de Software',
      niche: 'Gestión de Talento',
      problemDescription: 'La empresa tiene dificultades para gestionar la carga de trabajo entre los empleados debido a la falta de visibilidad en tiempo real sobre las tareas y las prioridades.',
      businessArea: 'hr',
      result: {
        problemAnalysis: {
          identifiedProblem: 'Asignación de tareas y gestión de la carga de trabajo ineficiente.',
          impact: 'Desequilibrio en la carga de trabajo, empleados sobrecargados, baja moral y riesgo de incumplimiento de plazos.'
        },
        shortTermSolution: {
          title: 'Dashboard de Carga de Trabajo',
          summary: 'Crear un tablero visual y centralizado para monitorear la carga de trabajo actual de cada empleado.',
          steps: [
            { step: 1, title: 'Centralizar Tareas', description: 'Utilizar una herramienta de gestión de proyectos para listar todas las tareas activas.' },
            { step: 2, title: 'Asignar Puntos', description: 'Asignar puntos de esfuerzo a cada tarea para cuantificar la carga de trabajo.' },
            { step: 3, title: 'Reunión Diaria', description: 'Realizar una breve reunión diaria para revisar el tablero y reasignar tareas si es necesario.' }
          ]
        },
        longTermSolution: {
          title: 'Asignación Dinámica de Tareas con IA',
          summary: 'Implementar un sistema de IA que asigne tareas automáticamente basándose en la disponibilidad, habilidades y carga de trabajo de cada empleado.',
          steps: [
            { step: 1, title: 'Mapeo de Habilidades', description: 'Crear un perfil para cada empleado con sus habilidades y competencias.' },
            { step: 2, title: 'Integrar Sistema IA', description: 'Adoptar una herramienta de gestión de proyectos con IA que sugiera asignaciones.' },
            { step: 3, title: 'Automatizar Flujos', description: 'Configurar el sistema para asignar nuevas tareas automáticamente al miembro del equipo más adecuado.' }
          ],
          isPremium: true
        }
      },
      timestamp: new Date(Date.now() - 19 * 86400000).toISOString(),
    },
    {
      id: 'sol-seed-5',
      companyType: 'Startup Tecnológica',
      niche: 'Finanzas y Operaciones',
      problemDescription: 'La empresa no tiene una visión clara de su flujo de caja futuro, lo que les lleva a tomar decisiones financieras de forma reactiva en lugar de proactiva.',
      businessArea: 'finance',
      result: {
        problemAnalysis: {
          identifiedProblem: 'Falta de previsión financiera y gestión reactiva del flujo de caja.',
          impact: 'Riesgo de insolvencia, incapacidad para planificar inversiones y decisiones financieras subóptimas.'
        },
        shortTermSolution: {
          title: 'Proyección Manual de Flujo de Caja',
          summary: 'Crear y mantener una hoja de cálculo para proyectar los ingresos y egresos de las próximas 4 semanas.',
          steps: [
            { step: 1, title: 'Listar Ingresos', description: 'Registrar todos los ingresos esperados de clientes y sus fechas probables de pago.' },
            { step: 2, title: 'Listar Egresos', description: 'Registrar todos los pagos fijos y variables (nóminas, alquiler, proveedores).' },
            { step: 3, title: 'Actualización Semanal', description: 'Revisar y actualizar la hoja de cálculo cada lunes para mantener la precisión.' }
          ]
        },
        longTermSolution: {
          title: 'Previsión Automatizada con IA',
          summary: 'Utilizar un software de IA que se conecte a las cuentas bancarias y al software de contabilidad para generar pronósticos de flujo de caja en tiempo real.',
          steps: [
            { step: 1, title: 'Integrar Herramienta', description: 'Conectar un software de previsión financiera con las cuentas bancarias y el sistema contable.' },
            { step: 2, title: 'Análisis de Escenarios', description: 'Utilizar la herramienta para simular diferentes escenarios (ej. retraso en un pago grande).' },
            { step: 3, title: 'Recibir Alertas', description: 'Configurar alertas automáticas para ser notificado de posibles déficits de caja con antelación.' }
          ],
          isPremium: true
        }
      },
      timestamp: new Date(Date.now() - 18 * 86400000).toISOString(),
    },
    {
        id: 'sol-seed-6',
        companyType: 'Agencia Creativa',
        niche: 'Gestión de Proyectos',
        problemDescription: 'Los plazos de entrega de proyectos se están descontrolando debido a la falta de un sistema centralizado de seguimiento de tareas y recursos.',
        businessArea: 'general',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Falta de un sistema unificado para la gestión y seguimiento de proyectos.',
                impact: 'Incumplimiento de plazos, mala comunicación entre equipos, y clientes insatisfechos.'
            },
            shortTermSolution: {
                title: 'Implementación de Tablero Kanban',
                summary: 'Adoptar un tablero Kanban (como Trello o Asana) para visualizar todas las tareas, sus responsables y su estado (Pendiente, En Progreso, Hecho).',
                steps: [
                    { step: 1, title: 'Configurar Tablero', description: 'Crear un tablero por proyecto con columnas para cada fase del flujo de trabajo.' },
                    { step: 2, title: 'Migrar Tareas', description: 'Añadir todas las tareas existentes al tablero y asignar responsables y fechas de entrega.' },
                    { step: 3, title: 'Reunión de Sincronización', description: 'Realizar una breve reunión diaria o semanal para revisar el tablero y discutir bloqueos.' }
                ]
            },
            longTermSolution: {
                title: 'Automatización de Flujos de Trabajo',
                summary: 'Utilizar las funciones de automatización de la herramienta de gestión para crear reglas que asignen tareas, notifiquen a los equipos y muevan tareas entre columnas automáticamente.',
                steps: [
                    { step: 1, title: 'Identificar Tareas Repetitivas', description: 'Analizar el flujo de trabajo para encontrar acciones que se realizan siempre de la misma manera.' },
                    { step: 2, title: 'Crear Reglas', description: 'Configurar automatizaciones como "Cuando una tarea se mueve a Revisión, notificar al Project Manager".' },
                    { step: 3, title: 'Generar Informes', description: 'Automatizar la generación de informes de progreso semanales para los stakeholders.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 17 * 86400000).toISOString(),
    },
    {
        id: 'sol-seed-7',
        companyType: 'Fábrica de Manufactura',
        niche: 'Cadena de Suministro',
        problemDescription: 'Una fábrica está enfrentando paradas inesperadas en la producción debido a fallos en el suministro de materias primas.',
        businessArea: 'logistics',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Cadena de suministro frágil y falta de visibilidad sobre los riesgos de los proveedores.',
                impact: 'Interrupciones costosas en la producción, retrasos en las entregas a clientes y pérdida de ingresos.'
            },
            shortTermSolution: {
                title: 'Plan de Contingencia y Stock de Seguridad',
                summary: 'Identificar proveedores alternativos para materias primas críticas y aumentar el stock de seguridad para cubrir posibles retrasos.',
                steps: [
                    { step: 1, title: 'Evaluar Proveedores Críticos', description: 'Hacer una lista de las materias primas sin las cuales la producción se detiene.' },
                    { step: 2, title: 'Buscar Alternativas', description: 'Investigar y contactar al menos a dos proveedores alternativos para cada material crítico.' },
                    { step: 3, title: 'Aumentar Stock', description: 'Incrementar el inventario de seguridad de estos materiales para cubrir una semana adicional de producción.' }
                ]
            },
            longTermSolution: {
                title: 'Monitorización Predictiva de la Cadena de Suministro',
                summary: 'Usar IA para analizar datos de proveedores, rutas logísticas y factores externos (clima, política) para predecir posibles interrupciones y generar alertas tempranas.',
                steps: [
                    { step: 1, title: 'Centralizar Datos', description: 'Integrar datos de proveedores, envíos y producción en una única plataforma.' },
                    { step: 2, title: 'Implementar IA', description: 'Adoptar un software que utilice IA para monitorear estos datos en busca de patrones de riesgo.' },
                    { step: 3, 'title': 'Planificación Dinámica', 'description': 'Utilizar las predicciones para ajustar dinámicamente los planes de producción y las rutas de suministro.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 16 * 86400000).toISOString(),
    },
    {
        id: 'sol-seed-8',
        companyType: 'Empresa Mediana',
        niche: 'Soporte Tecnológico (IT)',
        problemDescription: 'El equipo de soporte de tecnología tarda demasiado en identificar y resolver incidencias tecnológicas, lo que afecta la productividad de la empresa.',
        businessArea: 'it',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Proceso de gestión de incidencias ineficiente y falta de una base de conocimiento para soluciones recurrentes.',
                impact: 'Largas interrupciones para los empleados, pérdida de productividad y frustración generalizada.'
            },
            shortTermSolution: {
                title: 'Sistema de Tickets y Priorización',
                summary: 'Implementar un sistema de tickets para centralizar todas las solicitudes y establecer un sistema de priorización claro (Urgente, Alta, Media, Baja).',
                steps: [
                    { step: 1, title: 'Configurar Herramienta', description: 'Utilizar una herramienta de ticketing (como Jira Service Desk o Zendesk) para registrar todas las incidencias.' },
                    { step: 2, title: 'Definir Prioridades', description: 'Crear una matriz simple para clasificar las incidencias según su impacto y urgencia.' },
                    { step: 3, 'title': 'Establecer SLAs', 'description': 'Definir tiempos de respuesta y resolución esperados para cada nivel de prioridad.' }
                ]
            },
            longTermSolution: {
                title: 'Diagnóstico y Sugerencias con IA',
                summary: 'Utilizar una herramienta de IA que analice el texto de un nuevo ticket, lo compare con incidencias pasadas y sugiera automáticamente posibles soluciones o lo asigne al técnico más adecuado.',
                steps: [
                    { step: 1, title: 'Analizar Historial', description: 'Alimentar un modelo de IA con el historial de tickets resueltos para que aprenda patrones.' },
                    { step: 2, title: 'Clasificación Automática', description: 'Configurar el sistema para que la IA clasifique, priorice y asigne nuevos tickets automáticamente.' },
                    { step: 3, 'title': 'Base de Conocimiento Inteligente', 'description': 'La IA sugiere artículos de la base de conocimiento tanto a los usuarios al crear el ticket como a los técnicos al resolverlo.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 15 * 86400000).toISOString(),
    },
    {
        id: 'sol-seed-9',
        companyType: 'Agencia de Suscripciones',
        niche: 'Facturación y Cobros',
        problemDescription: 'La empresa está tardando demasiado en procesar la facturación de servicios recurrentes debido a la falta de un sistema automatizado.',
        businessArea: 'finance',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Proceso de facturación manual, propenso a errores y lento para servicios recurrentes.',
                impact: 'Retrasos en el flujo de caja, errores en facturas que generan desconfianza y alto costo administrativo.'
            },
            shortTermSolution: {
                title: 'Plantillas de Facturación y Recordatorios',
                summary: 'Crear plantillas de facturas estandarizadas y establecer un calendario de recordatorios manuales para agilizar el proceso de facturación mensual.',
                steps: [
                    { step: 1, title: 'Crear Plantillas', description: 'Diseñar una plantilla de factura en una hoja de cálculo o software de contabilidad con todos los campos necesarios.' },
                    { step: 2, title: 'Calendario de Facturación', description: 'Establecer fechas fijas cada mes para la emisión de facturas y los recordatorios de pago.' },
                    { step: 3, 'title': 'Seguimiento Manual', 'description': 'Llevar un registro en una hoja de cálculo de las facturas enviadas, pagadas y vencidas.' }
                ]
            },
            longTermSolution: {
                title: 'Plataforma de Facturación Recurrente Automatizada',
                summary: 'Adoptar un software de facturación (como Stripe Billing o Chargebee) que gestione automáticamente los ciclos de suscripción, la emisión de facturas y los reintentos de cobro.',
                steps: [
                    { step: 1, title: 'Migrar Clientes', description: 'Configurar los planes de suscripción en la nueva plataforma e importar los datos de los clientes.' },
                    { step: 2, title: 'Automatizar Cobros', description: 'Conectar la plataforma a una pasarela de pago para automatizar los cobros con tarjeta o débito directo.' },
                    { step: 3, 'title': 'Gestión de Dunning', 'description': 'Configurar un proceso automático de "dunning" para notificar a los clientes sobre pagos fallidos y reintentar el cobro.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 14 * 86400000).toISOString(),
    },
     {
        id: 'sol-seed-10',
        companyType: 'Fintech',
        niche: 'Seguridad Financiera',
        problemDescription: 'La empresa está experimentando un aumento en las transacciones fraudulentas, pero no tiene un sistema efectivo para detectarlas de forma temprana.',
        businessArea: 'finance',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Sistema de detección de fraude reactivo y basado en reglas simples, incapaz de adaptarse a nuevos patrones.',
                impact: 'Pérdidas financieras directas, daño a la reputación de la empresa y pérdida de confianza de los clientes.'
            },
            shortTermSolution: {
                title: 'Sistema de Reglas y Alertas Mejorado',
                summary: 'Ampliar el conjunto de reglas de detección de fraude existentes y establecer un sistema de alertas en tiempo real para transacciones de alto riesgo.',
                steps: [
                    { step: 1, title: 'Analizar Fraudes Pasados', description: 'Identificar patrones comunes en las transacciones fraudulentas de los últimos 3 meses.' },
                    { step: 2, title: 'Crear Nuevas Reglas', description: 'Añadir reglas como "Bloquear transacciones si hay 3 intentos fallidos en 5 minutos" o "Alertar si una transacción es 5 veces mayor al promedio del usuario".' },
                    { step: 3, 'title': 'Revisión Manual', 'description': 'Asignar a un equipo la tarea de revisar manualmente todas las transacciones que activen una alerta.' }
                ]
            },
            longTermSolution: {
                title: 'Detección de Fraude con Machine Learning',
                summary: 'Implementar un modelo de Machine Learning que analice miles de puntos de datos por transacción en tiempo real para calcular una puntuación de riesgo y bloquear automáticamente las operaciones sospechosas.',
                steps: [
                    { step: 1, title: 'Integrar API de Fraude', description: 'Contratar un servicio de detección de fraude basado en IA y conectarlo al flujo de transacciones a través de una API.' },
                    { step: 2, title: 'Entrenar el Modelo', description: 'Alimentar el modelo con datos históricos de transacciones, etiquetando cuáles fueron fraudulentas y cuáles legítimas.' },
                    { step: 3, 'title': 'Automatizar Decisiones', 'description': 'Configurar umbrales de riesgo para aprobar, rechazar o enviar a revisión manual cada transacción automáticamente.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 13 * 86400000).toISOString(),
    },
    {
        id: 'sol-seed-11',
        companyType: 'Sitio de E-commerce',
        niche: 'Experiencia de Usuario (UX)',
        problemDescription: 'Los usuarios abandonan el sitio web antes de completar una compra debido a una experiencia de navegación complicada y poco intuitiva.',
        businessArea: 'marketing',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Alta fricción en el proceso de compra y falta de personalización en la experiencia del usuario.',
                impact: 'Baja tasa de conversión, alta tasa de abandono de carritos y pérdida de ingresos potenciales.'
            },
            shortTermSolution: {
                title: 'Optimización del Proceso de Checkout',
                summary: 'Simplificar el proceso de pago reduciendo el número de pasos, eliminando campos innecesarios y ofreciendo opciones de pago como invitado.',
                steps: [
                    { step: 1, title: 'Analizar Embudos', description: 'Utilizar herramientas de analítica web para identificar en qué paso del checkout abandonan más usuarios.' },
                    { step: 2, title: 'Reducir Campos', description: 'Eliminar todos los campos opcionales del formulario de pago y habilitar el autocompletado de direcciones.' },
                    { step: 3, 'title': 'Añadir Confianza', 'description': 'Añadir sellos de seguridad, testimonios y políticas de devolución claras en la página de pago.' }
                ]
            },
            longTermSolution: {
                title: 'Personalización Dinámica con IA',
                summary: 'Implementar un motor de IA que analice el comportamiento de navegación de cada usuario en tiempo real para personalizar las recomendaciones de productos, las ofertas y el contenido del sitio.',
                steps: [
                    { step: 1, title: 'Instalar Motor de Personalización', description: 'Integrar un servicio de personalización por IA que rastree el comportamiento del usuario.' },
                    { step: 2, title: 'Crear Segmentos Dinámicos', description: 'Permitir que la IA agrupe a los usuarios en segmentos basados en sus intereses (ej. "buscadores de ofertas", "compradores de novedades").' },
                    { step: 3, 'title': 'Ajustar Contenido', 'description': 'Configurar reglas para que el sitio muestre banners, pop-ups y recomendaciones de productos diferentes para cada segmento.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 12 * 86400000).toISOString(),
    },
    {
        id: 'sol-seed-12',
        companyType: 'Fábrica de Alimentos',
        niche: 'Optimización de la Producción',
        problemDescription: 'La producción en la fábrica es ineficiente debido a la falta de visibilidad en tiempo real de las máquinas y el flujo de trabajo.',
        businessArea: 'logistics',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Falta de monitorización en tiempo real y planificación de la producción estática.',
                impact: 'Tiempos de inactividad de máquinas no planificados, cuellos de botella en la línea de producción y baja eficiencia general de los equipos (OEE).'
            },
            shortTermSolution: {
                title: 'Monitorización Manual y Tableros Visuales',
                summary: 'Implementar un sistema de registro manual de la producción por hora y mostrar los resultados en tableros visuales en la planta para fomentar la competencia y la transparencia.',
                steps: [
                    { step: 1, title: 'Hojas de Registro', description: 'Crear hojas de registro simples para que los operarios anoten la producción, el tiempo de inactividad y la causa cada hora.' },
                    { step: 2, title: 'Tableros Físicos', description: 'Instalar pizarras blancas en áreas clave para mostrar los objetivos de producción frente a los resultados reales.' },
                    { step: 3, 'title': 'Reuniones de Turno', 'description': 'Realizar una breve reunión al inicio y final de cada turno para discutir los resultados y los problemas.' }
                ]
            },
            longTermSolution: {
                title: 'Sistema de Ejecución de Manufactura (MES) con IA',
                summary: 'Implementar un sistema MES que utilice sensores IoT en las máquinas para recopilar datos en tiempo real. La IA analiza estos datos para predecir fallos, optimizar la planificación y ajustar dinámicamente el flujo de trabajo.',
                steps: [
                    { step: 1, title: 'Instalar Sensores IoT', description: 'Colocar sensores en las máquinas críticas para medir variables como la temperatura, la vibración y el rendimiento.' },
                    { step: 2, title: 'Implementar Software MES', description: 'Conectar los sensores a un software MES que centralice y visualice todos los datos de producción.' },
                    { step: 3, 'title': 'Mantenimiento Predictivo', 'description': 'Utilizar los algoritmos de IA del MES para predecir cuándo una máquina necesita mantenimiento antes de que falle, programando las reparaciones en momentos de baja producción.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 11 * 86400000).toISOString(),
    },
    {
        id: 'sol-seed-13',
        companyType: 'Empresa de Servicios',
        niche: 'Gestión de Nóminas',
        problemDescription: 'La empresa tiene dificultades para gestionar las nóminas manualmente, lo que causa errores y retrasa los pagos a los empleados.',
        businessArea: 'hr',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Proceso de nómina manual, lento y propenso a errores humanos.',
                impact: 'Retrasos en los pagos, insatisfacción de los empleados, riesgos de cumplimiento legal y consumo excesivo de tiempo del personal de RRHH.'
            },
            shortTermSolution: {
                title: 'Estandarización del Proceso de Nómina',
                summary: 'Crear una plantilla de hoja de cálculo estandarizada y un checklist detallado para reducir errores y asegurar la consistencia en cada ciclo de pago.',
                steps: [
                    { step: 1, title: 'Crear Plantilla Unificada', description: 'Diseñar una hoja de cálculo con fórmulas predefinidas para calcular deducciones e impuestos básicos de manera consistente.' },
                    { step: 2, title: 'Desarrollar Checklist', description: 'Elaborar una lista de verificación con cada paso del proceso, desde la recolección de horas hasta la confirmación de los pagos.' },
                    { step: 3, title: 'Implementar Doble Verificación', description: 'Establecer una política de revisión cruzada donde una segunda persona verifique los cálculos antes de procesar los pagos.' }
                ]
            },
            longTermSolution: {
                title: 'Automatización Inteligente de Nóminas',
                summary: 'Implementar un software de IA que automatiza el ciclo completo de la nómina, integrando el registro de horas, calculando impuestos y deducciones, y generando informes para minimizar errores.',
                steps: [
                    { step: 1, title: 'Integrar Sistema de Horas', description: 'Conectar el software de nómina con el sistema de registro de tiempo para importar automáticamente las horas trabajadas.' },
                    { step: 2, title: 'Configurar Reglas de Negocio', description: 'Definir reglas para el cálculo automático de impuestos, bonificaciones y deducciones según las políticas de la empresa.' },
                    { step: 3, title: 'Generar Alertas y Reportes', description: 'Automatizar la generación de recibos de pago y configurar alertas de IA para notificar sobre cualquier inconsistencia detectada.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 10 * 86400000).toISOString(),
    },
    {
        id: 'sol-seed-14',
        companyType: 'Fábrica de Manufactura',
        niche: 'Control de Calidad',
        problemDescription: 'El control de calidad en la línea de producción se realiza manualmente, lo que es lento y propenso a errores.',
        businessArea: 'logistics',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Inspección de calidad manual y subjetiva.',
                impact: 'Productos defectuosos llegan al cliente, aumento de devoluciones, daño a la reputación y costos de re-trabajo.'
            },
            shortTermSolution: {
                title: 'Estandarización de Criterios de Calidad',
                summary: 'Crear guías visuales y checklists detallados para que los inspectores manuales tengan criterios claros y objetivos para la aceptación o rechazo de productos.',
                steps: [
                    { step: 1, title: 'Documentar Defectos', description: 'Fotografiar y categorizar todos los tipos de defectos conocidos en un manual de calidad.' },
                    { step: 2, title: 'Crear Checklists de Inspección', description: 'Desarrollar una lista de puntos de control específicos para cada estación de inspección.' },
                    { step: 3, title: 'Capacitación y Calibración', description: 'Realizar sesiones de capacitación regulares para asegurar que todos los inspectores apliquen los mismos criterios.' }
                ]
            },
            longTermSolution: {
                title: 'Inspección de Calidad Automatizada con Visión por IA',
                summary: 'Implementar un sistema de cámaras de alta resolución y software de IA que analice imágenes de los productos en tiempo real para detectar defectos con una precisión y velocidad superiores a la humana.',
                steps: [
                    { step: 1, title: 'Instalar Cámaras', description: 'Colocar cámaras en puntos críticos de la línea de producción.' },
                    { step: 2, title: 'Entrenar el Modelo de IA', description: 'Alimentar el sistema con miles de imágenes de productos "buenos" y "malos" para que aprenda a diferenciar defectos.' },
                    { step: 3, title: 'Integrar con la Línea', description: 'Conectar el sistema de IA para que pueda desviar automáticamente los productos defectuosos de la línea de producción.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 9 * 86400000).toISOString(),
    },
    {
        id: 'sol-seed-15',
        companyType: 'Centro de Distribución',
        niche: 'Gestión de Almacenes',
        problemDescription: 'La gestión de inventarios en el almacén se hace de manera manual, lo que genera errores y desajustes en el stock disponible.',
        businessArea: 'logistics',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Registro de inventario manual y propenso a errores.',
                impact: 'Discrepancias entre el stock físico y el del sistema, lo que lleva a ventas de productos sin stock o a la imposibilidad de vender productos disponibles.'
            },
            shortTermSolution: {
                title: 'Ciclos de Conteo Regulares',
                summary: 'Implementar un sistema de conteo cíclico en lugar de un único inventario anual. Esto implica contar pequeñas secciones del almacén cada día para corregir errores de forma continua.',
                steps: [
                    { step: 1, title: 'Dividir el Almacén', description: 'Segmentar el almacén en zonas pequeñas y manejables (por pasillo, estantería, etc.).' },
                    { step: 2, title: 'Crear un Calendario', description: 'Programar el conteo de una o más zonas cada día, asegurando que todo el almacén se cuente cada trimestre.' },
                    { step: 3, title: 'Investigar Discrepancias', description: 'Analizar inmediatamente las causas de cualquier discrepancia encontrada para evitar que se repita.' }
                ]
            },
            longTermSolution: {
                title: 'Gestión de Inventario Automatizada con IA',
                summary: 'Utilizar un Sistema de Gestión de Almacenes (SGA) con IA que optimice la ubicación de productos, prediga la demanda y automatice las órdenes de reposición.',
                steps: [
                    { step: 1, title: 'Implementar Escaneo', description: 'Utilizar códigos de barras o QR y escáneres de mano para registrar todas las entradas, salidas y movimientos de productos.' },
                    { step: 2, title: 'Optimización de Ubicación', description: 'Dejar que la IA determine la ubicación óptima para cada producto basándose en su rotación para minimizar los tiempos de recogida.' },
                    { step: 3, title: 'Predicción de Reposición', description: 'Utilizar la IA para analizar tendencias y predecir cuándo se debe reponer cada artículo, generando órdenes de compra automáticas.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 8 * 86400000).toISOString(),
    },
     {
        id: 'sol-seed-16',
        companyType: 'Empresa SaaS',
        niche: 'Soporte al Cliente',
        problemDescription: 'El equipo de soporte recibe un alto volumen de incidencias, lo que retrasa la resolución de los problemas.',
        businessArea: 'it',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Gestión reactiva de incidencias y falta de automatización en la clasificación.',
                impact: 'Altos tiempos de primera respuesta, baja satisfacción del cliente y agotamiento del equipo de soporte.'
            },
            shortTermSolution: {
                title: 'Plantillas de Respuesta y Base de Conocimiento',
                summary: 'Crear plantillas para las respuestas más comunes y una base de conocimiento interna para que los agentes resuelvan problemas más rápido.',
                steps: [
                    { step: 1, title: 'Analizar Tickets Comunes', description: 'Identificar los 10 problemas más frecuentes reportados por los clientes.' },
                    { step: 2, title: 'Crear Plantillas', description: 'Redactar respuestas estandarizadas y claras para estos problemas comunes.' },
                    { step: 3, title: 'Documentar Soluciones', description: 'Crear una base de conocimiento interna con guías paso a paso para resolver problemas complejos.' }
                ]
            },
            longTermSolution: {
                title: 'Clasificación y Asignación Automática con IA',
                summary: 'Implementar un sistema de IA que analice el contenido de cada nueva incidencia, la clasifique, priorice y asigne automáticamente al agente con la experiencia más relevante.',
                steps: [
                    { step: 1, title: 'Análisis de Texto', description: 'La IA utiliza Procesamiento de Lenguaje Natural (PLN) para entender la urgencia y el tema de la incidencia.' },
                    { step: 2, title: 'Priorización Inteligente', description: 'El sistema asigna una prioridad basada no solo en lo que dice el cliente, sino en su historial y tipo de cuenta.' },
                    { step: 3, title: 'Enrutamiento por Habilidad', description: 'La incidencia se asigna automáticamente al agente que ha resuelto con éxito más casos similares en el pasado.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 7 * 86400000).toISOString(),
    },
    {
        id: 'sol-seed-17',
        companyType: 'E-commerce',
        niche: 'Email Marketing',
        problemDescription: 'Las campañas de marketing por correo electrónico se envían manualmente, lo que lleva mucho tiempo y puede ser menos efectivo.',
        businessArea: 'marketing',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Falta de segmentación y personalización en las campañas de email marketing.',
                impact: 'Bajas tasas de apertura y de clics, alta tasa de cancelación de suscripciones y oportunidades de venta perdidas.'
            },
            shortTermSolution: {
                title: 'Segmentación Manual Básica',
                summary: 'Segmentar la lista de correos en grupos básicos (ej. nuevos suscriptores, compradores recurrentes, inactivos) y enviarles mensajes ligeramente diferentes.',
                steps: [
                    { step: 1, title: 'Crear Segmentos', description: 'Dividir la lista de contactos en 3-4 grupos clave basados en su historial de compras y actividad reciente.' },
                    { step: 2, title: 'Adaptar Contenido', description: 'Crear una versión del newsletter para cada segmento (ej. un descuento de bienvenida para nuevos suscriptores).' },
                    { step: 3, title: 'Medir Resultados', description: 'Comparar las tasas de apertura y clics entre los diferentes segmentos para aprender qué funciona mejor.' }
                ]
            },
            longTermSolution: {
                title: 'Automatización y Personalización de Marketing con IA',
                summary: 'Utilizar una plataforma de marketing con IA que analice el comportamiento de cada usuario para enviar correos electrónicos personalizados y automatizados en el momento justo.',
                steps: [
                    { step: 1, title: 'Implementar Disparadores', description: 'Configurar correos automáticos que se activen por acciones del usuario (ej. abandono de carrito, visita a una categoría de producto).' },
                    { step:2, title: 'Contenido Dinámico', description: 'Usar la IA para insertar recomendaciones de productos personalizadas en cada correo, basadas en el historial de navegación del usuario.' },
                    { step: 3, title: 'Optimización de Hora de Envío', description: 'Permitir que la IA determine la mejor hora del día para enviar el correo a cada usuario individualmente, maximizando la probabilidad de apertura.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 6 * 86400000).toISOString(),
    },
    {
        id: 'sol-seed-18',
        companyType: 'Agencia de Desarrollo',
        niche: 'Gestión de Proyectos',
        problemDescription: 'Los equipos de trabajo tienen dificultades para seguir el progreso de los proyectos de manera manual, lo que resulta en retrasos y falta de comunicación.',
        businessArea: 'general',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Falta de visibilidad centralizada y seguimiento manual del progreso del proyecto.',
                impact: 'Retrasos en las entregas, mala asignación de recursos, falta de comunicación y una visión inexacta del estado del proyecto.'
            },
            shortTermSolution: {
                title: 'Implementación de Herramienta de Gestión Visual',
                summary: 'Adoptar una herramienta de gestión de proyectos como Trello o Asana para centralizar tareas, asignar responsables y visualizar el progreso en un tablero Kanban.',
                steps: [
                    { step: 1, title: 'Configurar el Tablero', description: 'Crear un tablero para cada proyecto con columnas que representen el flujo de trabajo (Pendiente, En Progreso, Revisión, Hecho).' },
                    { step: 2, title: 'Migrar Tareas', description: 'Añadir todas las tareas actuales al tablero, asignando responsables y fechas de entrega.' },
                    { step: 3, title: 'Reuniones Diarias (Stand-ups)', description: 'Realizar una reunión rápida de 15 minutos cada día para que el equipo sincronice el estado de las tareas.' }
                ]
            },
            longTermSolution: {
                title: 'Gestión Predictiva de Proyectos con IA',
                summary: 'Utilizar una herramienta de gestión de proyectos con IA que analice el progreso en tiempo real para predecir posibles retrasos, identificar cuellos de botella y sugerir reasignaciones de recursos.',
                steps: [
                    { step: 1, title: 'Análisis de Datos Históricos', description: 'Alimentar la herramienta con datos de proyectos pasados para que la IA aprenda los tiempos y patrones del equipo.' },
                    { step: 2, title: 'Alertas de Riesgo', description: 'La IA monitorea el progreso y genera alertas automáticas si un proyecto corre el riesgo de retrasarse.' },
                    { step: 3, title: 'Optimización de Recursos', description: 'El sistema sugiere cómo reasignar tareas o ajustar plazos para mantener el proyecto en curso cuando surgen imprevistos.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 5 * 86400000).toISOString(),
    },
    {
        id: 'sol-seed-19',
        companyType: 'Empresa en Crecimiento',
        niche: 'Recursos Humanos',
        problemDescription: 'El proceso de reclutamiento es lento y requiere de una gran cantidad de tiempo para filtrar candidatos y hacer las primeras entrevistas.',
        businessArea: 'hr',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Proceso de selección de candidatos manual y de alto volumen.',
                impact: 'Procesos de contratación largos, pérdida de buenos candidatos por la demora y una gran inversión de tiempo del equipo de RRHH en tareas repetitivas.'
            },
            shortTermSolution: {
                title: 'Plantillas de Correo y Preguntas Estructuradas',
                summary: 'Crear plantillas de correo electrónico para la comunicación con candidatos y una lista de preguntas de filtrado estandarizadas para agilizar las primeras fases.',
                steps: [
                    { step: 1, title: 'Formulario de Solicitud Estandarizado', description: 'Usar un formulario de solicitud online con preguntas clave para filtrar automáticamente a los candidatos no cualificados.' },
                    { step: 2, title: 'Plantillas de Comunicación', description: 'Crear correos predefinidos para confirmación, rechazo y solicitud de entrevista.' },
                    { step: 3, title: 'Guion de Entrevista de Filtrado', description: 'Desarrollar un guion de 15 minutos con preguntas específicas para evaluar rápidamente a los candidatos por teléfono.' }
                ]
            },
            longTermSolution: {
                title: 'Filtrado de CV y Pre-entrevistas con IA',
                summary: 'Implementar un Sistema de Seguimiento de Candidatos (ATS) con IA que analice y clasifique los currículums automáticamente, y utilice chatbots para realizar entrevistas de pre-filtrado.',
                steps: [
                    { step: 1, title: 'Análisis de CV con IA', description: 'La IA lee y entiende los CVs, puntuando a los candidatos según su adecuación a los requisitos del puesto.' },
                    { step: 2, title: 'Chatbot de Entrevista', description: 'Un chatbot realiza preguntas básicas a los candidatos (disponibilidad, expectativas salariales, experiencia clave) y registra sus respuestas.' },
                    { step: 3, title: 'Ranking de Candidatos', description: 'El sistema presenta al equipo de RRHH una lista corta y clasificada de los mejores candidatos, ahorrando horas de trabajo manual.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 4 * 86400000).toISOString(),
    },
    {
        id: 'sol-seed-20',
        companyType: 'Empresa de Software (SaaS)',
        niche: 'Facturación Recurrente',
        problemDescription: 'Las empresas con suscripciones o contratos recurrentes deben enviar facturas manualmente cada mes, lo que consume tiempo y es propenso a errores.',
        businessArea: 'finance',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Proceso de facturación recurrente manual.',
                impact: 'Errores en las facturas, retrasos en los cobros que afectan el flujo de caja y alto costo administrativo para gestionar las suscripciones.'
            },
            shortTermSolution: {
                title: 'Plantillas de Facturación y Calendario de Pagos',
                summary: 'Utilizar plantillas de facturas en un software de contabilidad y establecer un calendario riguroso para la emisión y seguimiento manual de las facturas recurrentes.',
                steps: [
                    { step: 1, title: 'Crear Plantillas Recurrentes', description: 'En el software de contabilidad, crear facturas recurrentes que se generen como borradores automáticamente cada mes.' },
                    { step: 2, title: 'Establecer un Día de Facturación', description: 'Definir un día específico del mes para revisar y enviar todas las facturas recurrentes.' },
                    { step: 3, title: 'Seguimiento en Hoja de Cálculo', description: 'Mantener una hoja de cálculo para hacer un seguimiento del estado de pago de cada factura enviada.' }
                ]
            },
            longTermSolution: {
                title: 'Plataforma de Gestión de Suscripciones con IA',
                summary: 'Adoptar una plataforma (como Chargebee o Stripe Billing) que automatice todo el ciclo de vida de la suscripción, desde la facturación y el cobro hasta la gestión de impagos (dunning) con IA.',
                steps: [
                    { step: 1, title: 'Automatizar la Emisión y el Cobro', description: 'Configurar los planes para que la plataforma genere y envíe facturas y cobre automáticamente a través de la pasarela de pago.' },
                    { step: 2, title: 'Gestión Inteligente de Impagos (Dunning)', description: 'La IA gestiona los pagos fallidos, reintentando el cobro en momentos óptimos y enviando recordatorios personalizados al cliente.' },
                    { step: 3, title: 'Análisis y Métricas', description: 'Utilizar los paneles de la plataforma para obtener métricas clave como el Ingreso Mensual Recurrente (MRR) y la tasa de abandono (Churn) en tiempo real.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
        id: 'sol-seed-21',
        companyType: 'Marca de Consumo',
        niche: 'Redes Sociales',
        problemDescription: 'La empresa necesita analizar los comentarios, menciones y mensajes de las redes sociales, pero realizarlo manualmente es lento y difícil de gestionar.',
        businessArea: 'marketing',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Monitorización y análisis manual de la opinión en redes sociales.',
                impact: 'Respuesta lenta a crisis de reputación, pérdida de oportunidades de interacción con clientes y falta de comprensión sobre la percepción de la marca.'
            },
            shortTermSolution: {
                title: 'Monitorización con Alertas Nativas',
                summary: 'Configurar las notificaciones de las plataformas de redes sociales y usar herramientas gratuitas como Google Alerts para monitorizar menciones de la marca.',
                steps: [
                    { step: 1, title: 'Activar Notificaciones', description: 'Asegurarse de que las notificaciones para menciones, comentarios y mensajes directos estén activadas en todas las plataformas.' },
                    { step: 2, title: 'Configurar Búsquedas Guardadas', description: 'En plataformas como Twitter/X, guardar búsquedas del nombre de la marca y productos para revisarlas diariamente.' },
                    { step: 3, title: 'Informe Manual Semanal', description: 'Dedicar tiempo cada semana para recopilar las menciones más importantes en un documento y analizar tendencias.' }
                ]
            },
            longTermSolution: {
                title: 'Análisis de Sentimiento con IA',
                summary: 'Utilizar una herramienta de escucha social (social listening) con IA que monitorice todas las menciones de la marca en tiempo real, analice el sentimiento (positivo, negativo, neutro) y clasifique los temas de conversación.',
                steps: [
                    { step: 1, title: 'Análisis de Sentimiento Automático', description: 'La IA lee cada mención y la clasifica, permitiendo identificar rápidamente crisis o elogios a gran escala.' },
                    { step: 2, title: 'Identificación de Tendencias', description: 'El sistema agrupa las conversaciones por temas, mostrando de qué están hablando los clientes en relación con la marca.' },
                    { step: 3, title: 'Alertas de Crisis', description: 'Configurar alertas automáticas que notifiquen al equipo si hay un pico repentino de menciones negativas, permitiendo una respuesta rápida.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
    {
        id: 'sol-seed-22',
        companyType: 'Tienda Online',
        niche: 'Procesamiento de Pedidos',
        problemDescription: 'El proceso de gestión de pedidos es lento y propenso a errores, lo que puede llevar a entregas tardías y mal gestionadas.',
        businessArea: 'logistics',
        result: {
            problemAnalysis: {
                identifiedProblem: 'Procesamiento de pedidos manual y desintegrado.',
                impact: 'Errores en el envío (producto o dirección incorrectos), retrasos en la entrega, clientes insatisfechos y altos costos de logística inversa (devoluciones).'
            },
            shortTermSolution: {
                title: 'Checklist de Procesamiento de Pedidos',
                summary: 'Crear un checklist estandarizado para cada etapa del procesamiento de un pedido (confirmación, preparación, empaquetado, envío) para minimizar errores.',
                steps: [
                    { step: 1, title: 'Mapear el Flujo', description: 'Documentar cada paso que sigue un pedido desde que se recibe hasta que se envía.' },
                    { step: 2, title: 'Crear el Checklist', description: 'Desarrollar una lista de verificación física o digital que el personal debe seguir para cada pedido.' },
                    { step: 3, title: 'Implementar Doble Verificación', description: 'Hacer que una segunda persona verifique el contenido del paquete contra la orden antes de sellarlo.' }
                ]
            },
            longTermSolution: {
                title: 'Automatización de la Gestión de Pedidos con IA',
                summary: 'Implementar un sistema que automatice el flujo de pedidos, desde la asignación de inventario hasta la selección de la mejor ruta de envío, utilizando IA para predecir y evitar problemas.',
                steps: [
                    { step: 1, title: 'Sincronización de Inventario', description: 'El sistema sincroniza el stock en tiempo real entre la tienda online y el almacén para evitar vender productos agotados.' },
                    { step: 2, title: 'Optimización de Rutas de Envío', description: 'La IA selecciona automáticamente la empresa de paquetería más rápida y rentable para cada pedido basándose en la ubicación del cliente y el tamaño del paquete.' },
                    { step: 3, title: 'Predicción de Retrasos', description: 'El sistema analiza datos de transporte y puede predecir posibles retrasos, notificando proactivamente al cliente.' }
                ],
                isPremium: true
            }
        },
        timestamp: new Date(Date.now() - 1 * 86400000).toISOString(),
    }
];