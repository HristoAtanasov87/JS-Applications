import { html } from '../../node_modules/lit-html/lit-html.js';
import { createFurniture } from '../api/data.js';

const createTemplate = (onSubmit, invalidMake, invalidModel, invalidYear, invalidDescription, invalidPrice, invalidImage) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Create New Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control + ${invalidMake ? 'is-invalid' : 'is-valid'}" id="new-make" type="text"
                        name="make">
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control + ${invalidModel ? 'is-invalid' : 'is-valid'}" id="new-model" type="text"
                        name="model">
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control + ${invalidYear ? 'is-invalid' : 'is-valid'}" id="new-year" type="number"
                        name="year">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control + ${invalidDescription ? 'is-invalid' : 'is-valid'}" id="new-description"
                        type="text" name="description">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control + ${invalidPrice ? 'is-invalid' : 'is-valid'}" id="new-price" type="number"
                        name="price">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control + ${invalidImage ? 'is-invalid' : 'is-valid'}" id="new-image" type="text"
                        name="img">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material">
                </div>
                <input type="submit" class="btn btn-primary" value="Create" />
            </div>
        </div>
    </form>`;

export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const data = {}
        data.make = formData.get('make');
        data.model = formData.get('model');
        data.year = formData.get('year');
        data.description = formData.get('description');
        data.price = formData.get('price');
        data.img = formData.get('img');
        data.material = formData.get('material');

        data.year = Number(data.year);
        data.price = Number(data.price);

        let invalidMake = false;
        let invalidModel = false;
        let invalidDescription = false;
        let invalidYear = false;
        let invalidImage = false;
        let invalidPrice = false;

        if (data.make.length < 4) {
            invalidMake = true;
            ctx.render(createTemplate(onSubmit, invalidMake, invalidModel, invalidYear, invalidDescription, invalidPrice, invalidImage));
            return alert('"Make" should contain at least 4 symbols');
        }

        if (data.model.length < 4) {
            invalidModel = true;
            ctx.render(createTemplate(onSubmit, invalidMake, invalidModel, invalidYear, invalidDescription, invalidPrice, invalidImage));
            return alert('"Model" should contain at least 4 symbols');
        }

        if (data.year < 1950 || data.year > 2050) {
            invalidYear = true;
            ctx.render(createTemplate(onSubmit, invalidMake, invalidModel, invalidYear, invalidDescription, invalidPrice, invalidImage));
            return alert('"Year" should be between 1950-2050');
        }

        if (data.description.length < 10) {
            invalidDescription = true;
            ctx.render(createTemplate(onSubmit, invalidMake, invalidModel, invalidYear, invalidDescription, invalidPrice, invalidImage));
            return alert('"Description" should contain at least 10 symbols');
        }

        if (data.price < 0) {
            invalidPrice = true;
            ctx.render(createTemplate(onSubmit, invalidMake, invalidModel, invalidYear, invalidDescription, invalidPrice, invalidImage));
            return alert('"Price" should be a positive number');
        }

        if (data.img == '') {
            invalidImage = true
            ctx.render(createTemplate(onSubmit, invalidMake, invalidModel, invalidYear, invalidDescription, invalidPrice, invalidImage));
            return alert('"Image" is required');
        }

        await createFurniture(data);
        ctx.page.redirect('/dashboard');
    }
}