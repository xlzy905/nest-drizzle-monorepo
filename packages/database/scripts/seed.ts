import * as schema from '../schema'
import { getDbClient } from '../index'

const dbClient = getDbClient(process.env.DATABASE_URL as string)

const initialUsers = [
  { fullName: 'John Doe', phone: '+1234567890' },
  { fullName: 'Jane Smith', phone: '+2345678901' },
  { fullName: 'Alice Johnson', phone: '+3456789012' },
  { fullName: 'Bob Williams', phone: '+4567890123' },
  { fullName: 'Charlie Brown', phone: '+5678901234' },
  { fullName: 'Diana Davis', phone: '+6789012345' },
  { fullName: 'Edward Wilson', phone: '+7890123456' },
  { fullName: 'Fiona Taylor', phone: '+8901234567' },
  { fullName: 'George Miller', phone: '+9012345678' },
  { fullName: 'Hannah Anderson', phone: '+0123456789' }
]

async function seedUsers() {
  for (const user of initialUsers) {
    await dbClient.insert(schema.users).values(user)
  }

  console.log('10 users seeded successfully')
}

async function main() {
  try {
    await seedUsers()
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    process.exit()
  }
}

main()
