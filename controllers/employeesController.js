import Employee from '../model/Employee.js';
import express from 'express';
const router = express.Router();

// router
//   .route('/')
//   .get(getAllEmployees)
//   .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
//   .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
//   .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

// router.route('/:id').get(getEmployee);

router.get('/', async (req, res) => {
  // .find gets all employees
  const employees = await Employee.find();
  if (!employees) {
    return res.status(204).json({ message: 'no employees found' });
  }
  res.json(employees);
});

router.post('/', async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: 'First and last names are required.' });
  }
  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
});

// need :id?
router.put('/', async (req, res) => {
  if (!req?.body?.id) {
    return res
      .status(400)
      .json({ message: 'Employee with this id is required to update' });
  }
  // Mongo db uses _id instead of id without underscore
  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches id: ${req.body.id}` });
  }
  if (req.body?.firstname) {
    employee.firstname = req.body.firstname;
  }
  if (req.body?.lastname) {
    employee.lastname = req.body.lastname;
  }
  // save function mimics SQL update
  const result = await employee.save();
  res.json(result);
});

// need :id?
router.delete('/', async (req, res) => {
  if (!req?.body?.id) {
    return res
      .status(400)
      .json({ message: 'Employee with this id is required to delete' });
  }

  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches id: ${req.body.id}` });
  }

  const result = await Employee.deleteOne({ _id: req.body.id });
  res.json(result);
});

router.get('/:id', async (req, res) => {
  if (req?.params?.id) {
    return res.status(400).json({ message: 'Employee id required' });
  }

  const employee = await Employee.findOne({ _id: req.params.id }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches id:${req.params.id}` });
  }
  res.json(employee);
});

export default router;
