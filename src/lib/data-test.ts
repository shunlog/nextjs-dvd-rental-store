import prisma from './prisma_client'

export async function fetchFilms(limit = 5) {
    const allFilms = await prisma.film.findMany({take: limit});
    return allFilms;
}


async function query_one_to_many(){
    const f_and_inv = await prisma.film.findMany({
        where: {
            film_id: 1,},
        include: {
            inventory: true,}});

    const inv_ls = f_and_inv[0].inventory;

    console.log(inv_ls);
}

async function query_new_films(){
    // return a list of films and their categories
    // which have the category "New"
    const f = await prisma.film.findMany({
        include: {film_category: {include: {category: true,}}},
        where: {
            film_category: {
                some: {
                    category: {name: {contains: 'New',}}}}}});

    if (f){
        f.forEach((film) => {
            const categories = film.film_category.map((fc) => fc.category.name);
            console.log({title: film.title,
                         categories: categories
                        });
        });
    }
}

async function films_and_categories() {
    // here we're using select -> include -> select,
    // which means for the fields: some (films) -> all (relation) -> some (category)
    const f1 = await prisma.film.findMany({
        take: 10,
        select: {
            title: true,
            film_category: {
                include: {
                    category: {
                        select: {
                            name: true,}}}}}});
    console.dir(f1, {depth: null});
}

async function count_categories() {
    // count how many actors and categories each film has:
    const f1 = await prisma.film.findMany({
        take: 10,
        select: {
            title: true,
            _count: {  // you can only _count a single relation depth with select
                select: {film_category: true, film_actor: true}}}});

    console.dir(f1, {depth: null});

    // restructure the object a bit
    const res = f1.map((i) => {
        const {_count: count, ...rest} = i;
        return {...rest, categories_count: count.film_category, actors_count: count.film_actor};
    })

    console.dir(res, {depth: null});
}

async function movies_with_actor_first_name(fn: string){
    // returns the movie titles with actors that have the given string in their name,
    // but only returns those actors, even though the movie might have others
    const r = await prisma.film.findMany({
        where: {
            film_actor: {some: {
                actor: {is: {
                    first_name: {contains: fn, mode: "insensitive"}}}}}},
        select: {
            title: true,
            film_actor: {
                where: {
                    actor: {is: {
                        first_name: {contains: fn, mode: "insensitive"}}}},
                select: {
                    actor: {
                        select: {
                            first_name: true,
                            last_name: true}}}}}});

    console.dir(r, {depth: null});
}

async function films_filter(search_str: string){
    const r = await prisma.film.findMany({
        where: {
            OR: [
                {title: {
                    contains: search_str,
                    mode: "insensitive"}},
                {description: {
                    contains: search_str,
                    mode: "insensitive"}}]}});
    console.dir(r, {depth: 2});
}

async function main(){
    films_filter("jaws");
}

main();
