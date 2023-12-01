const {
	createIngredient,
	getIngredientById,
	getAllIngredients,
	updateIngredient,
	deleteIngredient,
} = require('../models/ingredientModel');

exports.getAllIngredients = async (req, res) => {
	try {
		const ingredients = await getAllIngredients(); // Hier wird die Funktion aus dem Model aufgerufen
		res.status(200).json({
			data: ingredients,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.getIngredientById = async (req, res) => {
	const { ingredientId } = req.params;

	try {
		const ingredient = await getIngredientById(parseInt(ingredientId));

		if (!ingredient) {
			return res.status(404).json({
				message: 'Zutat nicht gefunden',
			});
		}

		res.status(200).json({
			data: ingredient,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.createIngredient = async (req, res) => {
	const { name, quantity, unitOfMass } = req.body;

	if (!name || !quantity || !unitOfMass) {
		return res.status(400).json({
			message: 'Name, Menge und Maßeinheit sind erforderlich',
		});
	}

	try {
		const newIngredient = await createIngredient(
			name,
			quantity,
			unitOfMass
		);

		if (!newIngredient) {
			return res.status(409).json({
				message: 'Zutat existiert bereits',
			});
		}

		res.status(201).json({
			message: 'Zutat erfolgreich erstellt',
			data: newIngredient,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.updateIngredient = async (req, res) => {
	const { ingredientId } = req.params;
	const { name, quantity, unitOfMass } = req.body;

	try {
		const updatedIngredient = await updateIngredient(
			parseInt(ingredientId),
			{
				name,
				quantity,
				unitOfMass,
			}
		);

		if (!updatedIngredient) {
			return res.status(404).json({
				message: 'Zutat nicht gefunden',
			});
		}

		res.status(200).json({
			message: 'Zutat erfolgreich aktualisiert',
			data: updatedIngredient,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.deleteIngredient = async (req, res) => {
	const { ingredientId } = req.params;

	try {
		const deletedIngredient = await deleteIngredient(
			parseInt(ingredientId)
		);

		if (!deletedIngredient) {
			return res.status(404).json({
				message: 'Zutat nicht gefunden',
			});
		}

		res.status(200).json({
			message: 'Zutat erfolgreich gelöscht',
			data: deletedIngredient,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
