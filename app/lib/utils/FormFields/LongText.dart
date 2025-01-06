import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class LongText extends StatefulWidget {
  final FormFieldSetter<String>? onChanged;
  final String? initialValue;
  final String longTextTitle;

  LongText({
    Key? key,
    this.onChanged,
    this.initialValue,
    required this.longTextTitle,
  }) : super(key: key);

  @override
  State<LongText> createState() => _LongTextState();
}

class _LongTextState extends State<LongText> {
  late TextEditingController _textController;

  @override
  void initState() {
    super.initState();
    _textController = TextEditingController(text: widget.initialValue);
  }

  @override
  void dispose() {
    _textController.dispose();
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
            widget.longTextTitle,
            style: GoogleFonts.poppins(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 20),
          TextFormField(
            controller: _textController,
            onChanged: widget.onChanged,
            maxLines: null,
            decoration: InputDecoration(
              hintText: 'Enter your long text here...',
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
