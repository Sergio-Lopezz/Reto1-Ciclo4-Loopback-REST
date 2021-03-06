import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Abogado,
  Cliente,
} from '../models';
import {AbogadoRepository} from '../repositories';

export class AbogadoClienteController {
  constructor(
    @repository(AbogadoRepository) protected abogadoRepository: AbogadoRepository,
  ) { }

  @get('/abogados/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Abogado has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.abogadoRepository.clientes(id).find(filter);
  }

  @post('/abogados/{id}/clientes', {
    responses: {
      '200': {
        description: 'Abogado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Abogado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInAbogado',
            exclude: ['id'],
            optional: ['abogadoId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.abogadoRepository.clientes(id).create(cliente);
  }

  @patch('/abogados/{id}/clientes', {
    responses: {
      '200': {
        description: 'Abogado.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.abogadoRepository.clientes(id).patch(cliente, where);
  }

  @del('/abogados/{id}/clientes', {
    responses: {
      '200': {
        description: 'Abogado.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.abogadoRepository.clientes(id).delete(where);
  }
}
