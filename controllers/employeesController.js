import data from '../model/employees.js';

export const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

export const createNewEmployee = (req, res) => {
  res.json({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
};

export const updateEmployee = (req, res) => {
  res.json({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
};

export const deleteEmployee = (req, res) => {
  res.json({ id: req.body.id });
};

export const getEmployee = (req, res) => {
  res.json({ id: req.params.id });
};
