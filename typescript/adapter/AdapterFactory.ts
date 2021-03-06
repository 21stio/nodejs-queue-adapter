import {SqsAdapter} from "./sqs/SqsAdapter";
import {IErrorHandler} from "../handler/error/IErrorHandler";
import {IEncoder} from "../encoder/IEncoder";
import {StdOutErrorHandler} from "../handler/error/StdOutErrorHandler";
import {JsonEncoder} from "../encoder/JsonEncoder";
import {BeanstalkdAdapter} from "./beanstalkd/BeanstalkdAdapter";
import {ActiveMqAdapter} from "./activemq/ActiveMqAdapter";
import {RabbitMqAdapter} from "./rabbitmq/RabbitMqAdapter";

export class AdapterFactory {

    public create(name:string, config:any, errorhandler?:IErrorHandler = new StdOutErrorHandler(), encoder?:IEncoder = JsonEncoder) {
        var adapter = null;
        switch (name) {
            case 'sqs':
                adapter = new SqsAdapter(errorhandler, encoder, config);
                break;
            case 'beanstalkd':
                adapter = new BeanstalkdAdapter(errorhandler, encoder, config);
                break;
            case 'activemq':
                adapter = new ActiveMqAdapter(errorhandler, encoder, config);
                break;
            case 'rabbitmq':
                adapter = new RabbitMqAdapter(errorhandler, encoder, config);
                break;
            default:
                throw new Error(name + ' is not a supported queue adapter')
        }

        return adapter;
    }
}