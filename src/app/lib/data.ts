import prisma from '@/app/lib/prisma_client'
import {resource_url} from "@/app/lib/api"


export function linkify_list({
    ls,  // the list of resource objects to linkify
    res_name,  // name of the resource for the `resource_url` function
    id_field,  // name of the id field in each object
    origin,  // optional, origin URL to prepend to the path
}){
    const ls2 = ls.map((obj) => {
        const {[id_field]: id, ...rest} = obj;
        const url = resource_url(res_name, id, origin);
        return {id: id, url: url, ...rest};
    })
  return ls2;
}

/*Our database schema has link tables to enable many-to-many relations.
 * After a query, we get something like this:
 *   'film_actor': [{actor: {actor_id: }}, ...]
 * We want to flatten it to this:
 *   'actors': [{id: 1, url: "/api/actors/1"}, ...]
 * And we want to add a "url" field to each related resource while at it. */
export function relation_flatten({
    obj,  // object which contains a field called `rel_table`
    rel_table,  // the name of the link table
    res_obj_field,  // the name of the @relation field in the link table
    res_id_field,  // name of the id field in the related object table
    ls_name,  // new name for the list after flattening
}){
    const {[rel_table]: ls, ...rest} = obj;
    const ls2 = ls.map((link_obj) => {
        const {[res_obj_field]: {[res_id_field]: id, ...rest_res_obj}} = link_obj;
        return {[res_id_field]: id, ...rest_res_obj};
    })
    return  {[ls_name]: ls2, ...rest}
}
