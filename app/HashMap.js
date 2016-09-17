function HashMap() {
    // 定义Map大小
    var size = 0;
    // 创建一个对象
    var entry = new Object();

    //判断Map是否为空
    this.isEmpty = function () {
        return size == 0;
    };

    //判断对象是否包含给定Key
    this.containsKey = function (key) {
        return (key in entry);
    }

    //判断对象是否包含给定Value
    this.containsValue = function (value) {
        for (var prop in entry) {
            if (entry[prop] == value) {
                return true;
            }
        }
        return false;
    }

    //向map中添加数据
    this.put = function (key, value) {
        if (!this.containsKey(key)) {
            size++;
        }
        entry[key] = value;
    }

    //根据给定的key获得value
    this.get = function (key) {
        return this.containsKey(key) ? entry[key] : null;
    }

    //根据给定的key删除一个值
    this.remove = function (key) {
        if (this.containsKey(key) && ( delete entry[key] )) {
            size--;
        }
    }


    //获取map中的所以value
    this.values = function () {
        var values = new Array();
        for (var prop in entry) {
            values.push(entry[prop]);
        }
        return values;
    }

    //获取map中的所有key
    this.keys = function () {
        var keys = new Array();
        for (var prop in entry) {
            keys.push(prop);
        }
        return keys;
    }

    //获取map的长度
    this.size = function () {
        return size;
    }

    //清空Map
    this.clear = function () {
        size = 0;
        entry = new Object();
    }
}