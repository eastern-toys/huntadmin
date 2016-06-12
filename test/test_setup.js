import btoa from 'btoa';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable);

global.CUBE_API_SERVER = 'http://unittest';
global.EVENTS_SERVER = 'ws://unittest-events';

global.btoa = btoa;
