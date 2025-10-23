#  Proyecto Final – Despliegue de Aplicación Web Escalable en AWS con IaC

##  Descripción del Proyecto
Este proyecto consiste en el **despliegue de una aplicación web escalable** en **Amazon Web Services (AWS)** utilizando **Infraestructura como Código (IaC)** con **CloudFormation**.  
El caso de estudio plantea el lanzamiento de una plataforma de **comercio electrónico** para una startup, garantizando seguridad, escalabilidad y automatización.

---

##  Funcionalidades Principales
- **Catálogo de productos:** listado con nombre, descripción y precio.  
- **Carrito de compras:** permite agregar y eliminar productos, y calcular el total.  
- **Proceso de pago:** simulado con un servicio de pago ficticio.  
- **Registro de usuarios:** con nombre de usuario y contraseña.  

---

##  Tecnologías Utilizadas

### Frontend
- **HTML5**, **CSS3**, **JavaScript** (con **jQuery**)
- Diseño minimalista y responsivo.

### Backend
- **Node.js** con **Express.js**
- **ORM:** Sequelize u otro similar
- **Base de datos:** AWS RDS (MySQL / PostgreSQL / MariaDB / Aurora)

---

##  Infraestructura AWS

| Componente | Descripción |
|-------------|-------------|
| **VPC** | Red privada para aislar los recursos. |
| **Subredes** | Públicas y privadas para organización de instancias. |
| **EC2** | Instancias para ejecutar la aplicación. |
| **Bastion Host** | Servidor de salto para acceso seguro. |
| **Load Balancer** | Distribuye tráfico entre las instancias. |
| **Auto Scaling Group** | Escalado automático según la demanda. |
| **RDS** | Base de datos administrada para persistencia de datos. |
| **S3 (opcional)** | Almacenamiento de archivos estáticos. |
| **CloudWatch** | Monitoreo y alarmas. |
| **SNS** | Notificaciones ante eventos críticos. |
| **CloudTrail** | Registro de actividad en la cuenta AWS. |
| **IAM** | Control de permisos y roles. |
| **CloudFormation** | Despliegue automatizado de toda la infraestructura. |

---

## 🧩 Despliegue

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/Despliegue-de-una-Aplicaci-n-Web-Escalable-en-AWS-con-IaC.git
   cd proyecto-final-aws

 2. Desplegar la infraestructura con CloudFormation
Ejecuta el siguiente comando para desplegar toda la infraestructura definida como código:

```bash
aws cloudformation deploy \
  --template-file main.yaml \
  --stack-name ecommerce-stack \
  --capabilities CAPABILITY_IAM \
  --region us-east-1
````

Esto creará los recursos definidos en la plantilla: VPC, subredes, instancias EC2, balanceador, base de datos RDS y políticas de seguridad.

3. Configurar las variables de entorno y ejecutar la aplicación:
   ````bash
   npm install
   npm start

4. Monitoreo y Seguridad

- CloudWatch: métricas de CPU, memoria y errores.

- IAM Roles: acceso controlado según principio de privilegio mínimo.

- Tagging: identificación y gestión eficiente de recursos.

5. Entregables

- Código fuente (frontend y backend).

- Plantillas CloudFormation.

- Scripts de configuración para instancias y servicios.

- Documentación técnica del despliegue.

- Presentación final del diseño y resultados del proyecto.
  
6. Aprendizajes Clave

- Aplicación de principios de arquitectura escalable y segura en la nube.

- Uso de Infraestructura como Código (IaC).

- Integración completa de servicios AWS en una solución realista.
