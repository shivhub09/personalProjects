import 'package:flutter/material.dart';

class Phone extends StatelessWidget {
  final ValueChanged<String>? onChanged;
  final String? initialValue;

  Phone({Key? key, this.onChanged, this.initialValue}) : super(key: key);

  final TextEditingController _phoneController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    if (initialValue != null) {
      _phoneController.text = initialValue!;
    }

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Phone Number",
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 10),
          TextFormField(
            controller: _phoneController,
            keyboardType: TextInputType.phone,
            decoration: InputDecoration(
              hintText: 'Enter Phone Number',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide(color: Colors.grey),
              ),
              contentPadding: EdgeInsets.symmetric(horizontal: 10, vertical: 12),
            ),
            onChanged: onChanged,
          ),
        ],
      ),
    );
  }
}
