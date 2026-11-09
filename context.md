# Contexto del Proyecto: Landing Page Interactiva "FitFlex"

Actúa como un Senior Frontend Engineer y CRO Specialist. Vamos a construir una Landing Page interactiva de alta conversión para **FitFlex**, un gimnasio en Cali, Colombia, enfocado en ser de **bajo costo, con horarios flexibles y acompañamiento personalizado incluido**.

Utiliza tus skills de diseño, librerías de UI y animaciones instaladas para lograr una interfaz moderna, fluida y con estética **Dark-First + Verde Neón** (inspirada en marcas fitness modernas, alto contraste, fondos oscuros profundos, acentos en verde neón brillante y toques violetas/púrpura sutiles).

---

## 1. Reglas de Negocio y Datos Reales (Hardcoded Data)

Usa estrictamente estos datos reales del negocio en toda la aplicación (moneda: Pesos Colombianos - COP):

- **Precios Base:**
  - Membresía Mensual: `$55.000 COP`
  - Pase Diario: `$8.000 COP`
- **Alianzas y Promociones:**
  - **Convenio Universitario:** `10% de descuento` en la membresía mensual presentando carnet universitario (Precio final con convenio: `$49.500 COP`).
  - **Programa de Referidos ("Plus Amigo"):** Todo miembro activo puede invitar gratis a un amigo durante **3 días**.
- **Catálogo de Hidratación y Suplementación Básica (Vitrina rápida):**
  1. Agua mineral: `$1.500 COP`
  2. Stick hidratante: `$3.300 COP`
  3. Bebida de proteína: `$17.000 COP`
- **Horarios de Atención:**
  - Lunes a Viernes: `6:00 AM – 6:00 PM`
  - Sábados y Domingos: `7:00 AM – 8:00 PM`
- **Propósito Social:** Contribución al **ODS 3 (Salud y Bienestar)**, promoviendo hábitos saludables en jóvenes universitarios (como estudiantes del Politécnico), trabajadores con horarios ajustados y principiantes.

---

## 2. Arquitectura de Secciones y Módulos Interactivos

Estructura la página con navegación fluida (Smooth Scroll) e implementa los siguientes módulos con estado real en el cliente:

### A. Sticky Navbar
- Logo de **FitFlex** ("Tu bienestar, a tu ritmo").
- Enlaces a: Propuesta de Valor, Calculadora de Ahorro, Test de Rutina, Productos y Convenios.
- CTA rápido: "Hacer mi valoración gratis".

### B. Hero Section (Above the Fold)
- **Badge superior:** "Cali • Alineados con el ODS 3: Salud y Bienestar".
- **Headline principal:** Enfocado en eliminar las 3 excusas clásicas ("¿Es muy costoso? ¿No tienes tiempo? ¿No sabes cómo empezar?") destacando entrenamientos personalizados y accesibles.
- **CTAs:** Botón primario hacia el Test de Valoración Inicial y botón secundario hacia la Calculadora de Ahorro.
- **Indicador de Horario en Vivo (Opcional/Visual):** Muestra los horarios de Lunes a Viernes (6am - 6pm) y Fines de Semana (7am - 8pm).

### C. Módulo Interactivo 1: Calculadora Inteligente (Pase Diario vs. Membresía)
Crea un componente interactivo para que el usuario compruebe por qué le conviene la membresía o el pase diario:
- **Inputs del usuario:**
  1. Slider o selector: *"¿Cuántos días a la semana planeas entrenar?"* (Rango: 1 a 7 días).
  2. Toggle / Checkbox: *"Tengo carnet universitario (-10% Dto.)"*.
- **Lógica de cálculo en tiempo real:**
  - `Costo Mensual en Pases Diarios` = `días_por_semana * 4 * 8000`.
  - `Costo Membresía Mensual` = Si tiene carnet universitario `$49.500 COP`, si no `$55.000 COP`.
- **Output visual:**
  - Compara ambos valores dinámicamente. (Nota: Con solo ir 2 días a la semana, en pases diarios gastaría $64.000 al mes, por lo que desde 2 días semanales ya ahorra dinero pagando la membresía mensual).
  - Muestra una alerta/badge dinámico indicando cuánto dinero exacto ahorra al mes eligiendo la opción recomendada, más el recordatorio de que la membresía incluye **3 días gratis para invitar a un amigo**.

### D. Propuesta de Valor (Bento Grid)
Organiza los diferenciadores del gimnasio en un Bento Grid moderno:
1. **Valoración Inicial y Rutinas a Medida:** Acompañamiento básico incluido sin pagar entrenadores privados costosos.
2. **Alianzas Universitarias y Empresariales:** 10% de descuento con carnet universitario + Pase de 3 días gratis para un amigo.
3. **Espacios Seguros y Equipos de Cardio/Musculación:** Mantenimiento preventivo y protocolos de seguridad y limpieza continua.
4. **Horarios Flexibles:** Pensado para universitarios y trabajadores con agendas apretadas.

### E. Módulo Interactivo 2: Test de Valoración Inicial ("Tu Rutina en 1 Minuto")
Un formulario interactivo paso a paso (Wizard / Multi-step form) que resuelve el dolor de *"No sé cómo empezar"*:
- **Pregunta 1:** ¿Cuánto tiempo llevas sin hacer ejercicio? (Ej: "Menos de 1 mes", "De 1 a 6 meses", "Más de 6 meses / Nunca he entrenado").
- **Pregunta 2:** ¿Cuánto tiempo tienes disponible para ejercitarte por sesión? (Ej: "30 - 45 min (Express)", "1 hora", "Más de 1 hora").
- **Pregunta 3:** ¿Qué tipo de ejercicio te gustaría realizar? (Ej: "Cardio y resistencia", "Musculación y pesas", "Mixto / Funcional").
- **Pregunta 4:** ¿Cuál es tu objetivo principal? (Opciones exactas: "Perder peso", "Mejorar la condición física", "Ganar fuerza").
- **Resultado del Test:**
  - Al completar las 4 preguntas, muestra en pantalla una **Tarjeta de Diagnóstico Preliminar** recomendándole un enfoque de entrenamiento según sus respuestas y su plan ideal.
  - Incluye un botón CTA que abra **WhatsApp** (`https://wa.me/...`) con un mensaje pre-armado que incluya las 4 respuestas del usuario para que el entrenador de FitFlex lo reciba listo.

### F. Vitrina Rápida: Hidratación y Suplementación Básica
Una sección limpia tipo micro-catálogo mostrando los complementos disponibles en el gimnasio para recargar energía al entrenar:
- **Agua mineral:** `$1.500 COP`
- **Stick hidratante:** `$3.300 COP`
- **Bebida de proteína:** `$17.000 COP`
- Permite que el usuario pueda "Pre-ordenar para recoger hoy en recepción" enviando el pedido rápido por WhatsApp.

### G. Footer y Cierre
- Resumen de horarios (L-V: 6:00am - 6:00pm | S-D: 7:00am - 8:00pm).
- Ubicación: Cali, Colombia.
- Redes sociales (Instagram, TikTok, Facebook, WhatsApp).

---

## 3. Instrucciones de Ejecución Técnica
1. Revisa el directorio actual; si el proyecto aún no está inicializado, configúralo con React/Next.js y Tailwind CSS.
2. Aplica tus skills de diseño y animaciones para que las transiciones del Test de 4 pasos, el slider de la calculadora y las tarjetas del Bento Grid se sientan de nivel producción.
3. Asegúrate de que toda la interfaz sea 100% responsiva (Mobile-First) y que ningún botón quede sin acción real.