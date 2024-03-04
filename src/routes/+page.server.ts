import type { Actions, PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const load: PageServerLoad = async () => {
    return {
        users: await prisma.users.findMany()
    };
};

export const actions: Actions = {
    add: async ({ request }) => {
        const data = await request.formData()
        const firstname = data.get("firstname")
        const lastname = data.get("lastname")
        const tel = data.get("tel")
        const email = data.get("email")
        await prisma.users.create({ data: { firstname, lastname, tel, email } })
    },
    update: async ({ request }) => {
        const data = await request.formData()
        const id = data.get("id")
        const firstname = data.get("firstname")
        const lastname = data.get("lastname")
        const tel = data.get("tel")
        const email = data.get("email")
        console.log({ id, firstname, lastname, tel, email });
        console.log("Update");
        await prisma.users.update({
            where: {
                id: parseInt(id)
            },
            data: { firstname, lastname, tel, email }
        })
    },
    delete: async ({ request }) => {
        const data = await request.formData()
        const id = data.get("id")
        await prisma.users.delete({
            where: {
                id: parseInt(id)
            }
        })
    },
}