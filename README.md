# Perfil — Notas & Estadística

[![CI/CD Pipeline](https://github.com/USERNAME/REPO/workflows/CI/CD%20Workflow%20-%20NRC%20B/badge.svg)](https://github.com/USERNAME/REPO/actions)
[![Coverage](https://codecov.io/gh/USERNAME/REPO/branch/main/graph/badge.svg)](https://codecov.io/gh/USERNAME/REPO)

## Descripción

Proyecto que implementa funciones matemáticas para el cálculo de notas ponderadas y percentiles, junto con una página web estática que muestra información del perfil académico.

## Funcionalidades

### 1. Cálculo de Nota Final Ponderada (`calcWeightedGrade`)
- Calcula una nota final ponderada a partir de componentes con peso
- Valida que la suma de pesos sea igual a 1 (±0.001 tolerancia)
- Retorna nota entre 0-100 con 2 decimales
- Manejo robusto de errores (TypeError/RangeError)

### 2. Cálculo de Percentil (`percentile`)
- Implementa el método nearest-rank (sin interpolación)
- Percentil p en rango [0,100]
- Ordena valores ascendentemente
- Reglas específicas para bordes (p=0 → mínimo, p=100 → máximo)

## Criterios de Aceptación CI/CD

### CI (Continuous Integration)
- ✅ CI corre en push/PR a main
- ✅ Lint sin errores
- ✅ Cobertura mínima ≥ 85% (líneas y ramas)
- ✅ PR bloqueado si CI o auditoría fallan

### CD (Continuous Deployment)
- ✅ Preview visible en el PR (URL única del preview)
- ✅ Live al hacer merge a main (condicionado a CI verde)
- ✅ Despliegue automático a Firebase Hosting

## Página Web

La página estática incluye:
- **Título**: "Perfil — Notas & Estadística"
- **Información Personal**: Nombre completo, NRC, correo institucional
- **Presentación**: Párrafo descriptivo (3-5 líneas)
- **Tabla de Calificaciones**: 4 asignaturas con notas simuladas
- **Estilos**: Diseño responsive sin frameworks, paleta de colores profesional

## Configuración del Proyecto

### Prerrequisitos
```bash
node >= 18.0.0
npm >= 8.0.0
```

### Instalación
```bash
npm install
```

### Scripts Disponibles
```bash
# Ejecutar pruebas
npm test

# Ejecutar pruebas con cobertura
npm run test:coverage

# Ejecutar linter
npm run lint

# Auditoría de seguridad
npm run audit

# Servir localmente (Firebase)
npm run serve

# Desplegar a Firebase
npm run deploy
```

## Configuración Firebase

### 1. Crear Proyecto Firebase
```bash
# Instalar Firebase CLI globalmente
npm install -g firebase-tools

# Iniciar sesión
firebase login

# Inicializar proyecto
firebase init hosting
```

### 2. Configurar Secrets en GitHub
Para que el despliegue automático funcione, necesitas configurar estos secrets en tu repositorio:

1. Ve a tu repositorio en GitHub
2. Navega a Settings → Secrets and variables → Actions
3. Añade estos secrets:

```
FIREBASE_SERVICE_ACCOUNT: [JSON del service account de Firebase]
```

### 3. Generar Service Account
```bash
# En Firebase Console → Project Settings → Service Accounts
# Generar nueva clave privada y descargar el JSON
```

## Estructura del Proyecto

```
.
├── .github/workflows/
│   └── CI.yml                 # Pipeline CI/CD
├── public/
│   ├── index.html            # Página principal
│   ├── app.js                # Scripts del frontend
│   └── 404.html              # Página de error
├── src/
│   └── utils/
│       ├── utils.js          # Funciones principales
│       └── utils.test.js     # Pruebas unitarias
├── coverage/                 # Reportes de cobertura
├── firebase.json            # Configuración Firebase
├── .firebaserc             # Proyecto Firebase
├── package.json            # Dependencias y scripts
└── README.md              # Documentación
```

## URLs de Despliegue

- **Producción**: https://perfil-notas-estadistica.web.app
- **Preview**: Se genera automáticamente en cada PR

## Badges de Estado

- **CI/CD Status**: Muestra el estado del pipeline
- **Coverage**: Porcentaje de cobertura de código
- **Firebase Deploy**: Estado del despliegue

## Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Autor

**Allan Fabricio Retana Morales**
- NRC: B
- Email: aretana@est.ups.edu.ec
- Universidad Politécnica Salesiana

## Licencia

Este proyecto está bajo la Licencia ISC - ver el archivo [LICENSE](LICENSE) para más detalles.
