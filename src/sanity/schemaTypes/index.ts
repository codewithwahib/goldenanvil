import { type SchemaTypeDefinition } from 'sanity'
import { products } from './products'
import {project} from './project'
import { blog } from './blogs'
import { attentionBar } from './bar'
import team1 from './team1'
import team2 from './team2'
import team3 from './team3'
import team4 from './team4'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products,attentionBar,blog,project,team1,team2,team3,team4],
}
