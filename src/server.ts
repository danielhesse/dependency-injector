import { Application } from './Application';
import { container } from './di/container';
import { Logger } from './logs/Logger';

container.register({ token: 'Logger', useClass: Logger });

const application = container.resolve<Application>(Application);
application.server();
