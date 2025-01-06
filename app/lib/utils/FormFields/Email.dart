import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Email extends StatefulWidget {
  final FormFieldSetter<String>? onChanged;
  final String? initialValue;
  final String emailTitle;

  Email({Key? key, this.onChanged, this.initialValue, required this.emailTitle})
      : super(key: key);

  @override
  _EmailState createState() => _EmailState();
}

class _EmailState extends State<Email> {
  late TextEditingController _emailController;

  @override
  void initState() {
    super.initState();
    _emailController = TextEditingController(text: widget.initialValue);
  }

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            widget.emailTitle,
            style:
                GoogleFonts.poppins(fontWeight: FontWeight.bold, fontSize: 20),
          ),
          SizedBox(height: 20),
          TextFormField(
            onChanged: widget.onChanged,
            controller: _emailController,
            decoration: InputDecoration(
              hintText: 'Enter your email here:',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            style: GoogleFonts.poppins(),
          ),
        ],
      ),
    );
  }
}
