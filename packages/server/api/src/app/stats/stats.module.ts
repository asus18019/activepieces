import { ALL_PRINCIPAL_TYPES, PrincipalType } from '@activepieces/shared'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { statsService } from './stats.service'

export const statsModule: FastifyPluginAsyncTypebox = async (app) => {
    await app.register(statsController, { prefix: '/v1/stats' })
}

const statsController: FastifyPluginAsyncTypebox = async (app) => {
    app.get(
        '/users/byRegisteredHour',
        {
            config: {
                allowedPrincipals: [PrincipalType.USER],
            }
        },
        statsService.getUsersByRegisteredHour,
    ),
    app.get(
        '/users/recent',
        {
            config: {
                allowedPrincipals: [PrincipalType.USER],
            }
        },
        statsService.getRecentUsers,
    ),
    app.get(
        '/users/meta',
        {
            config: {
                allowedPrincipals: [PrincipalType.USER],
            }
        },
        statsService.getUsersMeta,
    )
}