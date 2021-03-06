// Test for Todo contract

var Todo = artifacts.require('./Todo.sol');

contract('Todo', async (accounts) => {

  const account1 = accounts[0];
  const account2 = accounts[1];

  it('Testing Add on Todo contract', async () => {
    const contractInstance = await Todo.deployed();

    let addItemTxn1 = await contractInstance.addOrUpdate(1, "Item 1", {from : account2});
    for(let i = 0; i < addItemTxn1.logs.length; i++) {
      let log = addItemTxn1.logs[i];
      assert.isTrue(log.event == "LogItemAdded", 'LogItemAdded event not fired');
      assert.isTrue(log.args.position.toNumber() == 1, 'LogItemAdded position is incorrect');
    }
    let listSize1 = await contractInstance.getSize.call();
    assert.equal(listSize1, 1, 'Size of the list incorrect');

    let addItemTxn2 = await contractInstance.addOrUpdate(2, "Item 2", {from : account2});
    for(let i = 0; i < addItemTxn2.logs.length; i++) {
      let log = addItemTxn2.logs[i];
      assert.isTrue(log.event == "LogItemAdded", 'LogItemAdded event not fired');
      assert.isTrue(log.args.position.toNumber() == 2, 'LogItemAdded position is incorrect');
    }
    let listSize2 = await contractInstance.getSize.call();
    assert.equal(listSize2, 2, 'Size of the list incorrect');

    let addItemTxn3 = await contractInstance.addOrUpdate(3, "Item 3", {from : account2});
    for(let i = 0; i < addItemTxn3.logs.length; i++) {
      let log = addItemTxn3.logs[i];
      assert.isTrue(log.event == "LogItemAdded", 'LogItemAdded event not fired');
      assert.isTrue(log.args.position.toNumber() == 3, 'LogItemAdded position is incorrect');
    }
    let listSize3 = await contractInstance.getSize.call();
    assert.equal(listSize3, 3, 'Size of the list incorrect');

    let addItemTxn4 = await contractInstance.addOrUpdate(4, "Item 4", {from : account2});
    for(let i = 0; i < addItemTxn4.logs.length; i++) {
      let log = addItemTxn4.logs[i];
      assert.isTrue(log.event == "LogItemAdded", 'LogItemAdded event not fired');
      assert.isTrue(log.args.position.toNumber() == 4, 'LogItemAdded position is incorrect');
    }
    let listSize4 = await contractInstance.getSize.call();
    assert.equal(listSize4, 4, 'Size of the list incorrect');
  });

  it('Testing Update / Edit on Todo contract', async () => {
    const contractInstance = await Todo.deployed();
    //Update item
    let editItemTxn1 = await contractInstance.addOrUpdate(2, "Item 2 edited", {from : account2});
    for(let i = 0; i < editItemTxn1.logs.length; i++) {
      let log = editItemTxn1.logs[i];
      assert.isTrue(log.event == "LogItemUpdated", 'LogItemUpdated event not fired');
      assert.isTrue(log.args.position.toNumber() == 2, 'LogItemUpdated position is incorrect');
    }
    let listSizeAfterEdit1 = await contractInstance.getSize.call();
    assert.equal(listSizeAfterEdit1, 4, 'Size of the list incorrect');

    let itemFromListAfterEdit1 = await contractInstance.getItem.call(2);
    assert.equal(itemFromListAfterEdit1, "Item 2 edited", 'Item incorrectely stored in list');

    let editItemTxn2 = await contractInstance.addOrUpdate(4, "Item 4 edited", {from : account2});
    for(let i = 0; i < editItemTxn2.logs.length; i++) {
      let log = editItemTxn2.logs[i];
      assert.isTrue(log.event == "LogItemUpdated", 'LogItemUpdated event not fired');
      assert.isTrue(log.args.position.toNumber() == 4, 'LogItemUpdated position is incorrect');
    }
    let listSizeAfterEdit2 = await contractInstance.getSize.call();
    assert.equal(listSizeAfterEdit2, 4, 'Size of the list incorrect');

    let itemFromListAfterEdit2 = await contractInstance.getItem.call(4);
    assert.equal(itemFromListAfterEdit2, "Item 4 edited", 'Item incorrectely stored in list');
  });

  it('Testing Delete on Todo contract', async () => {
    const contractInstance = await Todo.deployed();
    let itemFromListAfterDelete10 = await contractInstance.getItem.call(2);

    let deleteItemTxn1 = await contractInstance.remove(1, {from : account2});
    for(let i = 0; i < deleteItemTxn1.logs.length; i++) {
      let log = deleteItemTxn1.logs[i];
      assert.isTrue(log.event == "LogItemRemoved", 'LogItemRemoved event not fired');
      assert.isTrue(log.args.position.toNumber() == 1, 'LogItemRemoved position is incorrect');
    }
    let listSizeAfterDelete1 = await contractInstance.getSize.call();
    assert.equal(listSizeAfterDelete1.toNumber(), 3, 'Size of the list incorrect');

    let itemFromListAfterDelete11 = await contractInstance.getItem.call(1);
    assert.equal(itemFromListAfterDelete11, itemFromListAfterDelete10, 'Item not delted from list');
  });

  it('Testing deletion of entire Todo list', async () => {
    const contractInstance = await Todo.deployed();
    let deletionTxn = await contractInstance.deleteTodo();

    for(let i = 0; i < deletionTxn.logs.length; i++) {
      let log = deletionTxn.logs[i];
      assert.isTrue(log.event == "LogTodoListReset", 'LogTodoListReset event not fired');
    }
    let listSizeAfterReset = await contractInstance.getSize.call();
    assert.equal(listSizeAfterReset.toNumber(), 0, 'Size of the list incorrect');
  });

});
